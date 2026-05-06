const imagesPath = {
  save: {
    path: "../images/svg/save_icon.svg",
    alt: "Save Icon",
  },
};

const StringMessages = {
  LoginCompon: {
    title: "Sign In",
    register: "Register",
    description: "Enter your email and password to sign in!",
    submitButtonText: "Sign Up",
    resetButtonText: "Sign Up",
    imagesPath: imagesPath.save.path,
    controls: {
      labels: {
        email: "Email Address",
        password: "Password",
      },
      placeHolder: {
        email: "Email Address",
        password: "Password",
      },
      tooltip: {
        email: "Please enter your registered email!",
        password: "Please enter your Password!",
      },
      buttons: {
        signIn: "Sign In",
      },
    },
  },
  CompanyBranches: {
    title: "Company Branches",
    description: "List of company brnaches",
    AddButtonText: "Add Company Branch",
    submitButtonText: "Sign Up",
    resetButtonText: "Sign Up",
    imagesPath: imagesPath.save.path,
    controls: {
      labels: {
        email: "Email Address",
        password: "Password",
      },
      placeHolder: {
        email: "Email Address",
        password: "Password",
      },
      tooltip: {
        email: "Please enter your registered email!",
        password: "Please enter your Password!",
      },
      buttons: {
        signIn: "Sign In",
      },
    },
  },
};

export default StringMessages;

export { imagesPath };
