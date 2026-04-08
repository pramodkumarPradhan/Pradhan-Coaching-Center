export default function DownloadsPage() {
  const files = [
    { name: "Math Chapter 1 Notes", url: "/math.pdf", size: "2.3 MB" },
    { name: "Science Chapter 2 Notes", url: "/science.pdf", size: "3.1 MB" },
    { name: "English Grammar Guide", url: "/english.pdf", size: "1.8 MB" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            📚 Study Materials
          </h1>
          <p className="text-gray-600 mt-2">
            Download your notes and resources easily
          </p>
        </div>

        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-xl border hover:shadow-md transition duration-200"
            >
              {/* File Info */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center bg-blue-100 text-blue-600 rounded-lg text-xl">
                  📄
                </div>
                <div>
                  <p className="font-semibold text-gray-800">
                    {file.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {file.size}
                  </p>
                </div>
              </div>

              {/* Download Button */}
              <a
                href={file.url}
                download
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition"
              >
                Download
              </a>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          © {new Date().getFullYear()} Study Portal
        </div>
      </div>
    </div>
  );
}