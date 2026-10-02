import AutumnHome from '@/components/autumn/AutumnHome'

export default function Home() {
  return (
    <>
      {/* Hidden form for Netlify Forms bot detection */}
      <form name="glit-subscribe" data-netlify="true" className="hidden">
        <input type="email" name="email" />
      </form>
      <form name="glit-diagnosis-apply" data-netlify="true" className="hidden">
        <input type="hidden" name="form-name" value="glit-diagnosis-apply" />
        <input type="text" name="name" />
        <input type="tel" name="contact" />
        <input type="checkbox" name="privacy" />
      </form>
      <form name="glit-interview-apply" data-netlify="true" className="hidden">
        <input type="hidden" name="form-name" value="glit-interview-apply" />
        <input type="text" name="name" />
        <input type="tel" name="phone" />
        <input type="email" name="email" />
        <input type="checkbox" name="privacy" />
      </form>
      <AutumnHome />
    </>
  )
}
