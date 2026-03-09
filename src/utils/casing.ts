export const formatLabel = (key: string) => {
  return key
    .replace(/([A-Z])/g, " $1") // 在大写字母前加空格
    .replace(/^./, str => str.toUpperCase()) // 首字母大写
    .trim();
};