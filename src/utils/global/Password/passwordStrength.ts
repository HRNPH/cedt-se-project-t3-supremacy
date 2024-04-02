export const enum PasswordCheckStrength {
  Short,
  Common,
  Weak,
  Ok,
  Strong,
}

export class PasswordCheckService {
  public static readonly MinimumLength = 5;

  // Regex to check for a common password string - all based on 5+ length passwords
  private static commonPasswordPatterns =
    /passw.*|12345.*|09876.*|qwert.*|asdfg.*|zxcvb.*|footb.*|baseb.*|drago.*/;

  //
  // Checks if the given password matches a set of common password
  //
  public static isPasswordCommon(password: string): boolean {
    return this.commonPasswordPatterns.test(password);
  }

  //
  // Returns the strength of the current password
  //
  public static checkPasswordStrength(password: string): string {
    // Build up the strenth of our password
    let numberOfElements = 0;
    numberOfElements = /.*[a-z].*/.test(password)
      ? ++numberOfElements
      : numberOfElements; // Lowercase letters
    numberOfElements = /.*[A-Z].*/.test(password)
      ? ++numberOfElements
      : numberOfElements; // Uppercase letters
    numberOfElements = /.*[0-9].*/.test(password)
      ? ++numberOfElements
      : numberOfElements; // Numbers
    numberOfElements = /[^a-zA-Z0-9]/.test(password)
      ? ++numberOfElements
      : numberOfElements; // Special characters (inc. space)

    // Assume we have a poor password already
    let currentPasswordStrength = PasswordCheckStrength.Short;

    // Check then strenth of this password using some simple rules
    if (
      password === null ||
      password.length < PasswordCheckService.MinimumLength
    ) {
      currentPasswordStrength = PasswordCheckStrength.Short;
    } else if (this.isPasswordCommon(password) === true) {
      currentPasswordStrength = PasswordCheckStrength.Common;
    } else if (
      numberOfElements === 0 ||
      numberOfElements === 1 ||
      numberOfElements === 2
    ) {
      currentPasswordStrength = PasswordCheckStrength.Weak;
    } else if (numberOfElements === 3) {
      currentPasswordStrength = PasswordCheckStrength.Ok;
    } else {
      currentPasswordStrength = PasswordCheckStrength.Strong;
    }
    let message;
    switch (currentPasswordStrength) {
      case PasswordCheckStrength.Short:
        message = "Password is too short";
        break;
      case PasswordCheckStrength.Common:
        message = "Password is too common";
        break;
      case PasswordCheckStrength.Weak:
        message = "Password is weak";
        break;
      case PasswordCheckStrength.Ok:
        message = "Password is okay";
        break;
      case PasswordCheckStrength.Strong:
        message = "Password is strong!";
        break;
      default:
        message = "";
    }
    return message;
  }
}
