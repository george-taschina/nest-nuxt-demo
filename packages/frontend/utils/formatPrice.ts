export default function (price: number) {
  return `$${(price / 100).toLocaleString('en-US')}`;
}
