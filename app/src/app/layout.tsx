import './globals.css';

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import '@/css/libs.bundle.css';
import '@/css/theme.bundle.css';
import Sidebar from "@/components/Sidebar";
import NbNotifications from "@/components/notification/NbNotifications";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href={"/assets/images/favicon/apple-touch-icon.png"} />
        <link rel="icon" type="image/png" href={"/assets/images/favicon/favicon.ico"} />

        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <meta name="keywords" content="" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Overpass:wght@200;300;400;600&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />

        <title>FetcherRep</title>
      </head>
      <body className={inter.className}>
        <main id="main">
          <nav className="navbar navbar-expand-lg navbar-light border-0 py-0 fixed-top bg-dark-800">
            <div className="container-fluid">
              <div className="d-flex justify-content-between align-items-center flex-grow-1 navbar-actions">
                <div className="menu-toggle cursor-pointer me-4 text-primary-hover transition-color disable-child-pointer">
                  <i className="ri-menu-fold-line ri-lg fold align-middle" data-bs-toggle="tooltip" data-bs-placement="right"
                     title="Close menu"></i>
                  <i className="ri-menu-unfold-line ri-lg unfold align-middle" data-bs-toggle="tooltip" data-bs-placement="right"
                     title="Open Menu"></i>
                </div>

                <div className="d-flex align-items-center">
                  <a className="btn-icon btn-hover-dark position-relative p-2 disable-child-pointer" data-bs-toggle="offcanvas" href="#offcanvasNotifications" role="button"
                     aria-controls="offcanvasNotifications">
                    <i className="ri-notification-fill align-bottom text-body lh-1"></i>
                    <NbNotifications />
                  </a>
                </div>
              </div>
            </div>
          </nav>
          {children}
        </main>
        <Sidebar></Sidebar>
      </body>
      </html>
  )
}
