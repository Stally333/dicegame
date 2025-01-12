interface StatusMessageProps {
  message: string;
  type?: 'info' | 'success' | 'error';
}

export default function StatusMessage({ message, type = 'info' }: StatusMessageProps) {
  const bgColors = {
    info: 'bg-blue-500',
    success: 'bg-green-500',
    error: 'bg-red-500'
  };

  return (
    <div className={`${bgColors[type]} text-white p-3 rounded-lg text-center font-medium shadow-md`}>
      {message}
    </div>
  );
} 