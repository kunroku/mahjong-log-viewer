export enum UserAgentType {
  MOBILE,
  PC,
}

export const getUserAgentType = () => {
  const ua = window.navigator.userAgent.toLowerCase();
  if (
    ua.indexOf('iphone') > 0 ||
    ua.indexOf('ipod') > 0 ||
    (ua.indexOf('android') > 0 && ua.indexOf('mobile') > 0)
  ) {
    return UserAgentType.MOBILE;
  } else if (ua.indexOf('ipad') > 0 || ua.indexOf('android') > 0) {
    return UserAgentType.MOBILE;
  } else if (
    ua.indexOf('ipad') > -1 ||
    (ua.indexOf('macintosh') > -1 && 'ontouchend' in document)
  ) {
    return UserAgentType.MOBILE;
  } else {
    return UserAgentType.PC;
  }
};
