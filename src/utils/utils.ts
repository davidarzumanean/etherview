export const getQueryParam = (query: string): string | null => {
  const url = new URL(window.location.href);
  return url.searchParams.get(query) || null;
}

export const setUrlQuery = ({param, value}: { param: string; value: string }) => {
  const url = new URL(window.location.href);
  url.searchParams.set(param, value);
  window.history.replaceState({}, '', url.toString());
}

export const formatNumber = (number: number): string => {
  const abbreviations = ['K', 'M', 'B', 'T'];

  let num = number;
  let abbreviation = '';

  for (let i = 0; i < abbreviations.length; i++) {
    if (num >= 1000) {
      num /= 1000;
      abbreviation = abbreviations[i];
    } else {
      break;
    }
  }

  return num.toFixed(2) + abbreviation;
}

export const formatAsUSD = (amount: number): string => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  return formatter.format(amount);
}

export const weiToUSD = (weiAmount: number, ethPriceInUSD: number): string => {
  const etherAmount = weiAmount / 1e18;

  return formatAsUSD(etherAmount * ethPriceInUSD);
}

export const timestampToDaysAndHours = (timestamp: number): string => {
  const now = Math.floor(Date.now() / 1000);
  const diff = now - timestamp;

  const days = Math.floor(diff / (60 * 60 * 24));
  const hours = Math.floor((diff % (60 * 60 * 24)) / (60 * 60));

  const dayText = days === 1 ? 'day' : 'days';
  const hourText = hours === 1 ? 'hr' : 'hrs';

  if (days > 0) {
    return `${days} ${dayText} ${hours} ${hourText} ago`;
  } else {
    return `${hours} ${hourText} ago`;
  }
}
