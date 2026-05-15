import type {
  User,
  AssessmentType,
  PersonalityDimension,
  TestSchedule,
  TestTaker,
  AdminTestResult,
  Batch,
} from '@/types/mbti';

// ===== Storage keys =====
const KEYS = {
  USERS: 'mbti_admin_users',
  ASSESSMENT_TYPES: 'mbti_assessment_types',
  DIMENSIONS: 'mbti_dimensions',
  BATCHES: 'mbti_batches',
  SCHEDULES: 'mbti_schedules',
  TEST_TAKERS: 'mbti_test_takers',
  TEST_RESULTS: 'mbti_admin_test_results',
} as const;

function read<T>(key: string): T[] {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function write<T>(key: string, data: T[]): void {
  localStorage.setItem(key, JSON.stringify(data));
}

// ===== 种子数据 =====
function ensureSeeds(): void {
  // 性格维度种子数据
  if (!localStorage.getItem(KEYS.DIMENSIONS)) {
    const dims: PersonalityDimension[] = [
      { id: 1, code: 'E', name: '外倾', description: '倾向于从外部世界获取能量', category: 'EI' },
      { id: 2, code: 'I', name: '内倾', description: '倾向于从内部世界获取能量', category: 'EI' },
      { id: 3, code: 'S', name: '感觉', description: '关注具体事实和细节', category: 'SN' },
      { id: 4, code: 'N', name: '直觉', description: '关注抽象概念和可能性', category: 'SN' },
      { id: 5, code: 'T', name: '思考', description: '基于逻辑和客观分析做决策', category: 'TF' },
      { id: 6, code: 'F', name: '情感', description: '基于价值观和个人感受做决策', category: 'TF' },
      { id: 7, code: 'J', name: '判断', description: '喜欢有计划有条理的生活方式', category: 'JP' },
      { id: 8, code: 'P', name: '感知', description: '喜欢灵活随性的生活方式', category: 'JP' },
    ];
    write(KEYS.DIMENSIONS, dims);
  }

  // 考核类型种子数据
  if (!localStorage.getItem(KEYS.ASSESSMENT_TYPES)) {
    const types: AssessmentType[] = [
      { id: 1, name: 'MBTI性格测试', description: '迈尔斯-布里格斯性格类型测试，评估16种人格类型', active: true, createdAt: new Date().toISOString() },
      { id: 2, name: '职业兴趣测试', description: '霍兰德职业兴趣测试，评估职业倾向', active: true, createdAt: new Date().toISOString() },
    ];
    write(KEYS.ASSESSMENT_TYPES, types);
  }

  // 批次种子数据
  if (!localStorage.getItem(KEYS.BATCHES)) {
    const batches: Batch[] = [
      { id: 1, name: '2026年第一批次', description: '2026年第一季度测试批次', startDate: '2026-01-01', endDate: '2026-03-31', active: true, createdAt: new Date().toISOString() },
      { id: 2, name: '2026年第二批次', description: '2026年第二季度测试批次', startDate: '2026-04-01', endDate: '2026-06-30', active: true, createdAt: new Date().toISOString() },
    ];
    write(KEYS.BATCHES, batches);
  }
}
ensureSeeds();

// ===== 用户管理 =====
export const adminUserService = {
  getAll(): User[] {
    const users = read<User>(KEYS.USERS);
    // 如果没有用户，创建默认管理员（直接写，避免 getAll/save 递归）
    if (users.length === 0) {
      const admin: User = {
        id: '1',
        name: '管理员',
        email: 'admin@example.com',
        password: 'admin123',
        role: 'ADMIN',
        active: true,
        testResults: [],
        createdAt: new Date().toISOString(),
      };
      write(KEYS.USERS, [admin]);
      return [admin];
    }
    return users;
  },

  getById(id: string): User | undefined {
    return this.getAll().find(u => u.id === id);
  },

  save(user: User): void {
    const users = this.getAll();
    const idx = users.findIndex(u => u.id === user.id);
    if (idx >= 0) users[idx] = user;
    else users.push(user);
    write(KEYS.USERS, users);
  },

  delete(id: string): void {
    const users = this.getAll().filter(u => u.id !== id);
    write(KEYS.USERS, users);
  },

  getNextId(): string {
    const users = this.getAll();
    return String(Math.max(0, ...users.map(u => Number(u.id))) + 1);
  },
};

// ===== 考核类型管理 =====
export const assessmentTypeService = {
  getAll(): AssessmentType[] {
    return read<AssessmentType>(KEYS.ASSESSMENT_TYPES);
  },

  getById(id: number): AssessmentType | undefined {
    return this.getAll().find(t => t.id === id);
  },

  save(type: AssessmentType): void {
    const list = this.getAll();
    const idx = list.findIndex(t => t.id === type.id);
    if (idx >= 0) list[idx] = type;
    else list.push(type);
    write(KEYS.ASSESSMENT_TYPES, list);
  },

  delete(id: number): void {
    write(KEYS.ASSESSMENT_TYPES, this.getAll().filter(t => t.id !== id));
  },

  getNextId(): number {
    const list = this.getAll();
    return Math.max(0, ...list.map(t => t.id)) + 1;
  },
};

// ===== 性格维度管理 =====
export const dimensionService = {
  getAll(): PersonalityDimension[] {
    return read<PersonalityDimension>(KEYS.DIMENSIONS);
  },

  getById(id: number): PersonalityDimension | undefined {
    return this.getAll().find(d => d.id === id);
  },

  save(dim: PersonalityDimension): void {
    const list = this.getAll();
    const idx = list.findIndex(d => d.id === dim.id);
    if (idx >= 0) list[idx] = dim;
    else list.push(dim);
    write(KEYS.DIMENSIONS, list);
  },

  delete(id: number): void {
    write(KEYS.DIMENSIONS, this.getAll().filter(d => d.id !== id));
  },

  getNextId(): number {
    const list = this.getAll();
    return Math.max(0, ...list.map(d => d.id)) + 1;
  },

  getCategories(): string[] {
    return ['EI', 'SN', 'TF', 'JP'];
  },
};

// ===== 批次管理 =====
export const batchService = {
  getAll(): Batch[] {
    return read<Batch>(KEYS.BATCHES);
  },

  getById(id: number): Batch | undefined {
    return this.getAll().find(b => b.id === id);
  },

  getActive(): Batch[] {
    return this.getAll().filter(b => b.active);
  },

  save(batch: Batch): void {
    const list = this.getAll();
    const idx = list.findIndex(b => b.id === batch.id);
    if (idx >= 0) list[idx] = batch;
    else list.push(batch);
    write(KEYS.BATCHES, list);
  },

  delete(id: number): void {
    write(KEYS.BATCHES, this.getAll().filter(b => b.id !== id));
  },

  getNextId(): number {
    const list = this.getAll();
    return Math.max(0, ...list.map(b => b.id)) + 1;
  },
};

// ===== 测试安排管理 =====
export const scheduleService = {
  getAll(): TestSchedule[] {
    return read<TestSchedule>(KEYS.SCHEDULES);
  },

  getById(id: number): TestSchedule | undefined {
    return this.getAll().find(s => s.id === id);
  },

  save(schedule: TestSchedule): void {
    const list = this.getAll();
    const idx = list.findIndex(s => s.id === schedule.id);
    if (idx >= 0) list[idx] = schedule;
    else list.push(schedule);
    write(KEYS.SCHEDULES, list);
  },

  delete(id: number): void {
    write(KEYS.SCHEDULES, this.getAll().filter(s => s.id !== id));
  },

  getNextId(): number {
    const list = this.getAll();
    return Math.max(0, ...list.map(s => s.id)) + 1;
  },
};

// ===== 参测人员管理 =====
export const testTakerService = {
  getAll(): TestTaker[] {
    return read<TestTaker>(KEYS.TEST_TAKERS);
  },

  getById(id: number): TestTaker | undefined {
    return this.getAll().find(t => t.id === id);
  },

  save(taker: TestTaker): void {
    const list = this.getAll();
    const idx = list.findIndex(t => t.id === taker.id);
    if (idx >= 0) list[idx] = taker;
    else list.push(taker);
    write(KEYS.TEST_TAKERS, list);
  },

  delete(id: number): void {
    write(KEYS.TEST_TAKERS, this.getAll().filter(t => t.id !== id));
  },

  getNextId(): number {
    const list = this.getAll();
    return Math.max(0, ...list.map(t => t.id)) + 1;
  },
};

// ===== 测试结果管理 =====
export const adminTestResultService = {
  getAll(): AdminTestResult[] {
    return read<AdminTestResult>(KEYS.TEST_RESULTS);
  },

  getById(id: number): AdminTestResult | undefined {
    return this.getAll().find(r => r.id === id);
  },

  save(result: AdminTestResult): void {
    const list = this.getAll();
    const idx = list.findIndex(r => r.id === result.id);
    if (idx >= 0) list[idx] = result;
    else list.push(result);
    write(KEYS.TEST_RESULTS, list);
  },

  delete(id: number): void {
    write(KEYS.TEST_RESULTS, this.getAll().filter(r => r.id !== id));
  },

  getNextId(): number {
    const list = this.getAll();
    return Math.max(0, ...list.map(r => r.id)) + 1;
  },

  getStats() {
    const results = this.getAll();
    const typeCount: Record<string, number> = {};
    results.forEach(r => {
      typeCount[r.personalityType] = (typeCount[r.personalityType] || 0) + 1;
    });
    return {
      total: results.length,
      completed: results.filter(r => r.completed).length,
      typeDistribution: typeCount,
    };
  },
};
