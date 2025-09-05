import SnowFlakeId from 'snowflake-id';

export const generateUniqueId = () => {
  return new SnowFlakeId({
    mid: 12321,
    offset: (2024 - 1998) * 365 * 24 * 60 * 60 * 1000,
  }).generate();
};
