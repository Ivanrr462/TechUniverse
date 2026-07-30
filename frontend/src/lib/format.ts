export const currency = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
});

export function formatPrice(value: number | null | undefined) {
  return currency.format(Number(value ?? 0));
}
