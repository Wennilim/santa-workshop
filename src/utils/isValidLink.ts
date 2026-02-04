export const isValidLink = (link: string) => {
  const value = link.trim();

  // 必须是 http / https 开头
  if (!/^https?:\/\//i.test(value)) return false;

  try {
    const url = new URL(value);

    if (!url.hostname) return false;

    const hostname = url.hostname;

    // 不允许 localhost / 纯IP（你可以按需求删掉）
    if (hostname.includes("localhost")) return false;
    if (/^\d{1,3}(\.\d{1,3}){3}$/.test(hostname)) return false;

    // 必须包含点，并且最后一段至少2个字母
    if (!/^[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}$/i.test(hostname)) return false;

    return true;
  } catch {
    return false;
  }
};
