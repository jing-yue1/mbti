# 数据库设计文档

> MBTI 性格测试与就业推荐系统  
> 适用数据库：MySQL 8.0+ / PostgreSQL 15+ / H2

---

## 一、ER 关系图（文字版）

```
┌──────────────────┐       ┌────────────────────┐
│      users       │       │ assessment_types    │
│──────────────────│       │────────────────────│
│ id (PK)          │       │ id (PK)             │
│ name             │       │ name                │
│ email (UK)       │       │ description         │
│ password         │       │ active              │
│ role             │       │ created_at          │
│ phone            │       └────────┬───────────┘
│ department       │                │
│ position         │       ┌────────┴───────────┐
│ active           │       │     questions       │
│ created_at       │       │────────────────────│
└──────────────────┘       │ id (PK)             │
                            │ text                │
┌──────────────────┐       │ dimension           │
│     batches      │       │ options (A/B)       │
│──────────────────│       │ assessment_type_id  │◄── FK
│ id (PK)          │       │ order_index         │
│ name             │       │ active              │
│ description      │       │ created_at          │
│ start_date       │       └────────────────────┘
│ end_date         │
│ active           │       ┌────────────────────┐
│ created_at       │       │  personality_dimensions
└────────┬─────────┘       │────────────────────│
         │                 │ id (PK)             │
         ▼                 │ code (UK)           │
┌──────────────────┐       │ name                │
│  test_schedules  │       │ description         │
│──────────────────│       │ category            │
│ id (PK)          │       │ created_at          │
│ batch_id (FK)    │◄──────┤                     │
│ assessment_type… │◄──────┤                     │
│ start_time       │       └────────────────────┘
│ end_time         │
│ location         │       ┌────────────────────┐
│ active           │       │   test_takers       │
│ created_at       │       │────────────────────│
└────────┬─────────┘       │ id (PK)             │
         │                 │ name                │
         ▼                 │ email (UK)          │
┌──────────────────┐       │ phone               │
│   test_results   │       │ department          │
│──────────────────│       │ position            │
│ id (PK)          │       │ batch_id (FK)       │◄──────┐
│ test_taker_id(FK)│◄──────┤ created_at          │       │
│ test_schedule_id │◄──────┘                     │       │
│ personality_type │       └─────────────────────┘       │
│ scores (EI/SN…)  │                                      │
│ percentages (…)  │                                      │
│ analysis         │                                      │
│ career_recommend │                                      │
│ completed_at     │                                      │
└──────────────────┘                                      │
                                                           │
Legend: PK = Primary Key, FK = Foreign Key, UK = Unique Key
```

## 二、表关系说明

| 表名 | 关联对象 | 关系类型 | 外键字段 | 说明 |
|------|----------|----------|----------|------|
| `questions` | `assessment_types` | N:1 | `assessment_type_id` | 一种考核类型有多道题目 |
| `test_schedules` | `batches` | N:1 | `batch_id` | 一个批次包含多次测试安排 |
| `test_schedules` | `assessment_types` | N:1 | `assessment_type_id` | 每次安排对应一种考核类型 |
| `test_takers` | `batches` | N:1 | `batch_id` | 参测人员归属于某个批次 |
| `test_results` | `test_takers` | N:1 | `test_taker_id` | 每份结果对应一个参测人员 |
| `test_results` | `test_schedules` | N:1 | `test_schedule_id` | 每份结果对应一次安排 |

## 三、字段设计要点

### 3.1 性格维度评分设计

`test_results` 表采用**展开式字段**存储 MBTI 各维度得分，而非 JSON 格式：

| 字段 | 含义 | 取值范围 |
|------|------|----------|
| `score_ei` | EI 维度总得分 | 正数→外向(E)，负数→内向(I) |
| `score_sn` | SN 维度总得分 | 正数→感觉(S)，负数→直觉(N) |
| `score_tf` | TF 维度总得分 | 正数→思考(T)，负数→情感(F) |
| `score_jp` | JP 维度总得分 | 正数→判断(J)，负数→感知(P) |
| `pct_e..pct_p` | 8 个维度的百分比 | 0-100，每对之和为 100 |

**设计理由：**
- 展开式字段便于 SQL 统计分析（`GROUP BY personality_type`、`AVG(score_ei)`）
- 避免 JSON 解析开销，兼容不支持 JSON 的旧版数据库
- 每对百分比之和为 100（`E% + I% = 100`），可用于可视化图表

### 3.2 题库选项设计

`questions` 表将一对选项存储为两个字段（`option_a_*` / `option_b_*`），而非关联表：

**设计理由：**
- MBTI 题目固定为二选一格式
- 减少 JOIN 查询，提升读取性能
- 选项语义对称（A 代表维度左侧，B 代表维度右侧）

### 3.3 密码存储

`users.password` 建议使用 **bcrypt** 加密存储，种子数据中的密码仅为示例占位符，实际部署需替换。

## 四、索引策略

| 表名 | 索引 | 类型 | 作用 |
|------|------|------|------|
| `users` | `email` | UNIQUE | 登录查询 |
| `users` | `role` | INDEX | 按角色筛选 |
| `questions` | `dimension` | INDEX | 按维度分组出题 |
| `questions` | `order_index` | INDEX | 题目排序 |
| `test_schedules` | `batch_id` | INDEX | 按批次查询安排 |
| `test_schedules` | `(start_time, end_time)` | COMPOSITE | 时间范围查询 |
| `test_results` | `personality_type` | INDEX | 类型分布统计 |
| `test_results` | `(completed, completed_at)` | COMPOSITE | 已完成结果统计 |

## 五、分页与查询优化建议

```sql
-- 1. 按批次查询测试结果（含参测人员信息）
SELECT
    tr.personality_type,
    tt.name       AS taker_name,
    tt.department,
    tr.completed_at,
    tr.career_recommendation
FROM test_results tr
JOIN test_takers tt       ON tr.test_taker_id = tt.id
JOIN test_schedules ts    ON tr.test_schedule_id = ts.id
WHERE ts.batch_id = 1
  AND tr.completed = TRUE
ORDER BY tr.completed_at DESC
LIMIT 20 OFFSET 0;

-- 2. 性格类型分布统计
SELECT
    personality_type,
    COUNT(*) AS count,
    ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER(), 1) AS percentage
FROM test_results
WHERE completed = TRUE
GROUP BY personality_type
ORDER BY count DESC;

-- 3. 各部门 MBTI 分布
SELECT
    tt.department,
    tr.personality_type,
    COUNT(*) AS count
FROM test_results tr
JOIN test_takers tt ON tr.test_taker_id = tt.id
WHERE tr.completed = TRUE
GROUP BY tt.department, tr.personality_type
ORDER BY tt.department, count DESC;

-- 4. 职业推荐 Top-N
SELECT
    career_recommendation,
    COUNT(*) AS frequency
FROM test_results
WHERE completed = TRUE
  AND career_recommendation IS NOT NULL
GROUP BY career_recommendation
ORDER BY frequency DESC;
```

## 六、迁移注意事项

1. **自增基数**：种子数据使用了固定 ID（1,2,3...），如需重置自增起始值：
   ```sql
   -- MySQL
   ALTER TABLE users AUTO_INCREMENT = 100;
   ALTER TABLE test_results AUTO_INCREMENT = 100;
   ```

2. **外键约束**：`schema.sql` 中的外键默认注释掉了。建议在**数据初始化完成后再开启**，避免种子数据插入顺序导致外键冲突。

3. **数据库兼容性**：
   - MySQL：使用 `ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`
   - PostgreSQL：将 `AUTO_INCREMENT` 替换为 `SERIAL`，`DATETIME` 替换为 `TIMESTAMP`
   - H2：兼容 MySQL 模式，直接运行即可

4. **前端对应关系**：本数据库设计与 `src/services/adminService.ts` 中的实体完全对应，每个表对应一个 Service 对象的 CRUD 操作。
