-- ============================================================================
-- MBTI 性格测试与就业推荐系统 · 数据库建表脚本
-- 适用数据库：MySQL 8.0+ / PostgreSQL 15+ / H2
-- 字符集建议：utf8mb4（MySQL）或 UTF8（PG/H2）
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. 用户表 (users)
-- ----------------------------------------------------------------------------
CREATE TABLE users (
    id           BIGINT       AUTO_INCREMENT PRIMARY KEY COMMENT '用户唯一标识',
    name         VARCHAR(100) NOT NULL                COMMENT '用户姓名',
    email        VARCHAR(255) NOT NULL                COMMENT '用户邮箱（登录标识）',
    password     VARCHAR(255)                         COMMENT '登录密码（可为空，支持免密登录）',
    role         VARCHAR(20)  NOT NULL DEFAULT 'USER' COMMENT '角色：ADMIN（管理员）/ USER（普通用户）',
    phone        VARCHAR(30)                          COMMENT '手机号',
    department   VARCHAR(100)                         COMMENT '所属部门',
    position     VARCHAR(100)                         COMMENT '职位',
    active       BOOLEAN      NOT NULL DEFAULT TRUE   COMMENT '是否启用',
    created_at   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    UNIQUE KEY uk_users_email (email),
    INDEX idx_users_role (role),
    INDEX idx_users_active (active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户表';

-- ----------------------------------------------------------------------------
-- 2. 考核类型表 (assessment_types)
-- ----------------------------------------------------------------------------
CREATE TABLE assessment_types (
    id          BIGINT       AUTO_INCREMENT PRIMARY KEY COMMENT '类型唯一标识',
    name        VARCHAR(100) NOT NULL                COMMENT '考核类型名称（如：MBTI测试）',
    description TEXT                                   COMMENT '类型描述',
    active      BOOLEAN      NOT NULL DEFAULT TRUE   COMMENT '是否启用',
    created_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX idx_at_active (active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='考核类型表';

-- ----------------------------------------------------------------------------
-- 3. 性格维度表 (personality_dimensions)
-- ----------------------------------------------------------------------------
CREATE TABLE personality_dimensions (
    id          BIGINT       AUTO_INCREMENT PRIMARY KEY COMMENT '维度唯一标识',
    code        VARCHAR(2)   NOT NULL                COMMENT '维度代码：E/I/S/N/T/F/J/P',
    name        VARCHAR(50)  NOT NULL                COMMENT '维度名称（如：外倾、内倾）',
    description TEXT                                   COMMENT '维度详细描述',
    category    VARCHAR(4)   NOT NULL                COMMENT '所属类别：EI（精力态度）/ SN（认知方式）/ TF（决策方式）/ JP（生活方式）',
    created_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    UNIQUE KEY uk_dim_code (code),
    INDEX idx_dim_category (category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='性格维度表';

-- ----------------------------------------------------------------------------
-- 4. 题库表 (questions)
-- ----------------------------------------------------------------------------
CREATE TABLE questions (
    id                 BIGINT       AUTO_INCREMENT PRIMARY KEY COMMENT '题目唯一标识',
    text               VARCHAR(500) NOT NULL                COMMENT '题目文本',
    dimension          VARCHAR(4)   NOT NULL                COMMENT '所属维度类别：EI/SN/TF/JP',
    option_a_text      VARCHAR(200) NOT NULL                COMMENT '选项A文本',
    option_a_value     INT          NOT NULL DEFAULT 1      COMMENT '选项A分值（1-7）',
    option_b_text      VARCHAR(200) NOT NULL                COMMENT '选项B文本',
    option_b_value     INT          NOT NULL DEFAULT 7      COMMENT '选项B分值（1-7）',
    assessment_type_id BIGINT                               COMMENT '关联考核类型ID',
    order_index        INT          NOT NULL DEFAULT 0      COMMENT '题目排序序号',
    active             BOOLEAN      NOT NULL DEFAULT TRUE   COMMENT '是否启用',
    created_at         DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at         DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX idx_q_dimension (dimension),
    INDEX idx_q_assessment_type (assessment_type_id),
    INDEX idx_q_order (order_index),
    INDEX idx_q_active (active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='题库表';

-- ----------------------------------------------------------------------------
-- 5. 批次表 (batches)
-- ----------------------------------------------------------------------------
CREATE TABLE batches (
    id          BIGINT       AUTO_INCREMENT PRIMARY KEY COMMENT '批次唯一标识',
    name        VARCHAR(100) NOT NULL                COMMENT '批次名称（如：2026年第一批次）',
    description TEXT                                   COMMENT '批次描述',
    start_date  DATE         NOT NULL                COMMENT '批次开始日期',
    end_date    DATE         NOT NULL                COMMENT '批次结束日期',
    active      BOOLEAN      NOT NULL DEFAULT TRUE   COMMENT '是否启用',
    created_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX idx_b_active (active),
    INDEX idx_b_dates (start_date, end_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='测试批次表';

-- ----------------------------------------------------------------------------
-- 6. 测试安排表 (test_schedules)
-- ----------------------------------------------------------------------------
CREATE TABLE test_schedules (
    id                 BIGINT       AUTO_INCREMENT PRIMARY KEY COMMENT '安排唯一标识',
    batch_id           BIGINT       NOT NULL                COMMENT '关联批次ID',
    assessment_type_id BIGINT       NOT NULL                COMMENT '关联考核类型ID',
    start_time         DATETIME     NOT NULL                COMMENT '测试开始时间',
    end_time           DATETIME     NOT NULL                COMMENT '测试结束时间',
    location           VARCHAR(200)                         COMMENT '测试地点（如：线上 / 会议室A）',
    active             BOOLEAN      NOT NULL DEFAULT TRUE   COMMENT '是否启用',
    created_at         DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at         DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX idx_ts_batch (batch_id),
    INDEX idx_ts_type (assessment_type_id),
    INDEX idx_ts_time (start_time, end_time),
    INDEX idx_ts_active (active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='测试安排表';

-- ----------------------------------------------------------------------------
-- 7. 参测人员表 (test_takers)
-- ----------------------------------------------------------------------------
CREATE TABLE test_takers (
    id          BIGINT       AUTO_INCREMENT PRIMARY KEY COMMENT '人员唯一标识',
    name        VARCHAR(100) NOT NULL                COMMENT '参测人员姓名',
    email       VARCHAR(255) NOT NULL                COMMENT '参测人员邮箱',
    phone       VARCHAR(30)                          COMMENT '联系电话',
    department  VARCHAR(100)                         COMMENT '所属部门',
    position    VARCHAR(100)                         COMMENT '职位',
    batch_id    BIGINT                               COMMENT '关联批次ID',
    created_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    UNIQUE KEY uk_tt_email (email),
    INDEX idx_tt_batch (batch_id),
    INDEX idx_tt_department (department)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='参测人员表';

-- ----------------------------------------------------------------------------
-- 8. 测试结果表 (test_results)
-- ----------------------------------------------------------------------------
CREATE TABLE test_results (
    id                      BIGINT       AUTO_INCREMENT PRIMARY KEY COMMENT '结果唯一标识',
    test_taker_id           BIGINT       NOT NULL                COMMENT '关联参测人员ID',
    test_schedule_id        BIGINT                               COMMENT '关联测试安排ID',
    personality_type        VARCHAR(4)   NOT NULL                COMMENT 'MBTI类型（如：INTJ、ENFP）',

    -- 各维度原始得分（正数→前者，负数→后者）
    score_ei                INT          NOT NULL DEFAULT 0      COMMENT 'EI维度得分（正=E，负=I）',
    score_sn                INT          NOT NULL DEFAULT 0      COMMENT 'SN维度得分（正=S，负=N）',
    score_tf                INT          NOT NULL DEFAULT 0      COMMENT 'TF维度得分（正=T，负=F）',
    score_jp                INT          NOT NULL DEFAULT 0      COMMENT 'JP维度得分（正=J，负=P）',

    -- 各维度百分比
    pct_e                   INT          NOT NULL DEFAULT 0      COMMENT '外向(E)百分比',
    pct_i                   INT          NOT NULL DEFAULT 0      COMMENT '内向(I)百分比',
    pct_s                   INT          NOT NULL DEFAULT 0      COMMENT '感觉(S)百分比',
    pct_n                   INT          NOT NULL DEFAULT 0      COMMENT '直觉(N)百分比',
    pct_t                   INT          NOT NULL DEFAULT 0      COMMENT '思考(T)百分比',
    pct_f                   INT          NOT NULL DEFAULT 0      COMMENT '情感(F)百分比',
    pct_j                   INT          NOT NULL DEFAULT 0      COMMENT '判断(J)百分比',
    pct_p                   INT          NOT NULL DEFAULT 0      COMMENT '感知(P)百分比',

    analysis                TEXT                                 COMMENT '性格分析报告',
    career_recommendation   TEXT                                 COMMENT '职业推荐建议',
    completed               BOOLEAN      NOT NULL DEFAULT FALSE  COMMENT '是否已完成',
    completed_at            DATETIME                             COMMENT '完成测试时间',
    created_at              DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',

    INDEX idx_tr_taker (test_taker_id),
    INDEX idx_tr_schedule (test_schedule_id),
    INDEX idx_tr_type (personality_type),
    INDEX idx_tr_completed (completed, completed_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='测试结果表';

-- ============================================================================
-- 外键约束（建议在数据初始化后添加）
-- ============================================================================
-- ALTER TABLE questions
--     ADD CONSTRAINT fk_q_assessment_type
--     FOREIGN KEY (assessment_type_id) REFERENCES assessment_types(id)
--     ON DELETE SET NULL;
--
-- ALTER TABLE test_schedules
--     ADD CONSTRAINT fk_ts_batch
--     FOREIGN KEY (batch_id) REFERENCES batches(id)
--     ON DELETE CASCADE,
--     ADD CONSTRAINT fk_ts_assessment_type
--     FOREIGN KEY (assessment_type_id) REFERENCES assessment_types(id)
--     ON DELETE CASCADE;
--
-- ALTER TABLE test_takers
--     ADD CONSTRAINT fk_tt_batch
--     FOREIGN KEY (batch_id) REFERENCES batches(id)
--     ON DELETE SET NULL;
--
-- ALTER TABLE test_results
--     ADD CONSTRAINT fk_tr_taker
--     FOREIGN KEY (test_taker_id) REFERENCES test_takers(id)
--     ON DELETE CASCADE,
--     ADD CONSTRAINT fk_tr_schedule
--     FOREIGN KEY (test_schedule_id) REFERENCES test_schedules(id)
--     ON DELETE SET NULL;
