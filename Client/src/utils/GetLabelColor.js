const COLOR_CLASSES = [
  'bg-red-100 text-red-800',
  'bg-orange-100 text-orange-800',
  'bg-amber-100 text-amber-800',
  'bg-violet-100 text-violet-800',
  'bg-yellow-100 text-yellow-800',
  'bg-indigo-100 text-indigo-800',
  'bg-lime-100 text-lime-800',
  'bg-green-100 text-green-800',
  'bg-emerald-100 text-emerald-800',
  'bg-teal-100 text-teal-800',
  'bg-cyan-100 text-cyan-800',
  'bg-sky-100 text-sky-800',
  'bg-blue-100 text-blue-800',
  'bg-violet-100 text-violet-800',
  'bg-purple-100 text-purple-800',
  'bg-pink-100 text-pink-800',
  'bg-rose-100 text-rose-800',
];

const getLabelColor = (status) => {
  // Handle null, undefined, or non-string values safely
  if (!status || typeof status !== 'string') {
    return 'bg-gray-100 text-gray-800'; // fallback color
  }

  // Create a simple hash from the string
  let hash = 0;
  for (let i = 0; i < status.length; i++) {
    hash = status.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Map hash to one of the available color classes
  const index = Math.abs(hash) % COLOR_CLASSES.length;

  return COLOR_CLASSES[index];
};

export default getLabelColor;