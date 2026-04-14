const CUSTOMERS_KEY = 'olivetta_customers';
const CURRENT_USER_KEY = 'olivetta_current_user';
const STAMPS_KEY_BASE = 'olivetta_stamps_';
const REWARD_SHOWING_KEY_BASE = 'olivetta_reward_showed_';

export function getCustomers() {
  try {
    const data = localStorage.getItem(CUSTOMERS_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

export function saveCustomers(customers) {
  localStorage.setItem(CUSTOMERS_KEY, JSON.stringify(customers));
}

export function getCustomer(email) {
  const customers = getCustomers();
  return customers[email.toLowerCase().trim()] || null;
}

export function createCustomer({ email, name }) {
  const customers = getCustomers();
  const key = email.toLowerCase().trim();
  if (customers[key]) return null;
  customers[key] = {
    email: key,
    name: name.trim(),
    createdAt: Date.now(),
    lastVisit: Date.now(),
  };
  saveCustomers(customers);
  return customers[key];
}

export function setCurrentUser(email) {
  localStorage.setItem(CURRENT_USER_KEY, email.toLowerCase().trim());
}

export function getCurrentUser() {
  const email = localStorage.getItem(CURRENT_USER_KEY);
  if (!email) return null;
  return getCustomer(email);
}

export function logout() {
  localStorage.removeItem(CURRENT_USER_KEY);
}

function stampKey(email) {
  return STAMPS_KEY_BASE + email.toLowerCase().trim();
}

export function getStamps(email) {
  return parseInt(localStorage.getItem(stampKey(email)), 10) || 0;
}

export function addStamp(email) {
  if (!email) return { newCount: 0, tier: null };
  const oldCount = getStamps(email);
  const newCount = oldCount >= 10 ? 1 : oldCount + 1;
  localStorage.setItem(stampKey(email), String(newCount));

  // Determine which reward to show
  let tier = null;
  if (newCount === 5 && !wasRewardShown(email, 'tier1')) {
    tier = 'tier1';
    markRewardShown(email, 'tier1');
  } else if (newCount === 10 && !wasRewardShown(email, 'tier2')) {
    tier = 'tier2';
    markRewardShown(email, 'tier2');
  }

  return { newCount, tier };
}

function rewardKey(email, tier) {
  return REWARD_SHOWING_KEY_BASE + email.toLowerCase().trim() + '_' + tier;
}

export function wasRewardShown(email, tier) {
  return localStorage.getItem(rewardKey(email, tier)) === 'true';
}

export function markRewardShown(email, tier) {
  localStorage.setItem(rewardKey(email, tier), 'true');
}

export function resetRewardFlags(email) {
  localStorage.removeItem(rewardKey(email, 'tier1'));
  localStorage.removeItem(rewardKey(email, 'tier2'));
}

export function addStampForCustomer(email) {
  if (!email) return 0;
  const oldCount = getStamps(email);
  const newCount = Math.min(oldCount + 1, 10);
  localStorage.setItem(stampKey(email), String(newCount));
  return newCount;
}

export function getAllCustomerSnapshots() {
  const customers = getCustomers();
  return Object.entries(customers).map(([email, customer]) => ({
    ...customer,
    stamps: getStamps(email),
  }));
}
