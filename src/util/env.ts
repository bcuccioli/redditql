export default function env(name: string) {
  const value = process.env[name];
  if (value === undefined) {
    console.error(`Missing environment variable: ${name}`);
    process.exit(1);
  }
  return value;
}
