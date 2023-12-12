export default function Main({children,className}){
  return (
    <main className={`pt-24 min-h-screen ${className}`}>
      {children}
    </main>
  )
}