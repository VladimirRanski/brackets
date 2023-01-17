module.exports = function check(str, bracketsConfig) {
  if (str.length % 2 == 1) return false;
  const st = [];
  let flag = false;

  const isOpen = (br) => {
    for (let i = 0; i < bracketsConfig.length; i++) {
      const open = bracketsConfig[i][0];
      const close = bracketsConfig[i][1];

      if (br == open && br == close && st[st.length - 1] == open) {
        flag = true;
        isClosed(br);
        break;
      }

      if (br == open && br == close) {
        flag = true;
        st.push(br);
        break;
      }

      if (br == open) {
        st.push(br);
        flag = true;
        break;
      }

      if (br === close && st.length === 0) return false;
    }
  };

  const isClosed = (br) => {
    for (let i = 0; i < bracketsConfig.length; i++) {
      const open = bracketsConfig[i][0];
      const close = bracketsConfig[i][1];

      if (br == close && st[st.length - 1] == open) {
        st.pop();
      }
      if (
        (br == close && st[st.length - 1] !== open) ||
        (br == close && st.length === 0)
      ) {
        return false;
      }
    }
  };

  for (let i = 0; i < str.length; i++) {
    flag = false;
    isOpen(str[i]);
    if (flag) continue;
    isClosed(str[i]);
  }

  return st.length == 0 ? true : false;
};
