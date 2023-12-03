import '../styles/PasswordStrengthMeter.css';

export default function PasswordStrengthMeter({ password }: { password: string }) {
  if (!password) {
    return null;
  }

  const calculateStrength = () => {
    const length = password.length;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);

    const strength =
      (length >= 8 ? 1 : 0) +
      (hasUpperCase ? 1 : 0) +
      (hasLowerCase ? 1 : 0) +
      (hasNumbers ? 1 : 0) +
      (hasSpecialChars ? 1 : 0);

    return strength;
  };

  return (
    <div className="password-strength">
      <span>Password Strength: {getStrengthLabel(calculateStrength())}</span>
      <meter value={calculateStrength()} min={0} max={5} low={2} high={4} optimum={5} />
    </div>
  );
}

const getStrengthLabel = (strength: number) => {
  switch (strength) {
    case 1:
      return 'Very Weak';
    case 2:
      return 'Weak';
    case 3:
      return 'Moderate';
    case 4:
      return 'Strong';
    case 5:
      return 'Very Strong';
    default:
      return 'Very Strong';
  }
};
