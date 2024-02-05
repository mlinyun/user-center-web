/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.CurrentUser } | undefined) {
  // 获取当前用户信息
  const { currentUser } = initialState ?? {};
  return {
    // 判断当前登录的用户是否为管理员
    canAdmin: currentUser && currentUser.userRole === 1,
  };
}
