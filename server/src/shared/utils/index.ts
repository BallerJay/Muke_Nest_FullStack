/**
 * @description 随机生成一个四位数字的验证码
 * @returns
 */
export const getRandomCode = () => {
  const code = [];
  for (let i = 0; i < 4; i++) {
    const randomNum = Math.floor(Math.random() * 9);
    code.push(randomNum);
  }

  return code.join('');
};
