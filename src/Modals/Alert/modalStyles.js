function modalBodyStyle ({
    isAlertModal,
    isCreatePWD,
    isTermsAndConditions,
    isEditCartItem,
    isEditExistingScheme
  }) {
    const styles = { backgroundColor: "#fff" };
  
    if (isAlertModal) {
      styles.borderTop = "8px solid #fecb2e";
    } else if (isCreatePWD || isTermsAndConditions) {
      styles.borderTop = "3px solid #fecb2e";
    } else if (isEditCartItem) {
      styles.borderTop = "3px solid #fecb2e";
      styles.maxHeight = "530px";
    } else if (isEditExistingScheme) {
      styles.borderTop = "3px solid #fecb2e";
      styles["overflow-y"] = "scroll";
      styles.maxHeight = "530px";
    }
  
    return styles;
  }
  
  export { modalBodyStyle };
  