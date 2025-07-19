import UsernameForm from '@/components/UsernameForm';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Username Availability Checker
          </h1>
          <p className="mt-2 text-gray-600">
            Check if your desired username is available and register it.
          </p>
        </div>
        <UsernameForm />
      </div>
    </main>
  );
}
