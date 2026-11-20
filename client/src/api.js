// Small fetch wrapper used by all pages
export async function api(path, { method = 'GET', body, user, isForm = false } = {}) {
  const headers = {};
  if (user) headers['x-user-id'] = user._id;
  if (body && !isForm) headers['Content-Type'] = 'application/json';

  const res = await fetch(path, {
    method,
    headers,
    body: body ? (isForm ? body : JSON.stringify(body)) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'حدث خطأ، حاول مرة أخرى');
  return data;
}

export const photoUrl = (fileName) => `/uploads/${fileName}`;
export const formatDate = (d) => new Date(d).toLocaleString('ar-EG', { dateStyle: 'medium', timeStyle: 'short' });
