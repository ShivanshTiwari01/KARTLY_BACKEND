declare module 'snowflake-id' {
  interface SnowFlakeIdOptions {
    mid?: number;
    offset?: number;
  }

  export default class SnowFlakeId {
    constructor(options?: SnowFlakeIdOptions);
    generate(): string | number;
  }
}
