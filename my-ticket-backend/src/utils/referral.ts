export function generateReferralCode(name: string): string {
    const random = Math.floor(1000 + Math.random() * 9000);
    return `${name.toLowerCase().replace(/\s/g, '')}${random}`;
  }
  