import SideBar from '@/app/ui/sidebar';
import '@/app/ui/global.css'

export const metadata = {
  title: 'Cats',
  description: 'Cats!',
}


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body>
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
          <div className="w-full flex-none md:w-64">
            <SideBar />
          </div>
          <div className="flex-grow px-6 md:overflow-y-auto md:px-12">{children}</div>
        </div>
      </body>
    </html>
  );
}