import { useEffect, useState } from 'react'
import {
  ArrowDownRight,
  ArrowRight,
  BookOpen,
  Check,
  CircleAlert,
  ExternalLink,
  FlaskConical,
  Info,
  Lightbulb,
  Menu,
  Quote,
  ShieldCheck,
  Target,
  X,
} from 'lucide-react'

const navItems = [
  { id: 'opening', label: '01 / Dẫn nhập' },
  { id: 'schools', label: '02 / Quan niệm' },
  { id: 'theory', label: '03 / Nhận thức' },
  { id: 'truth', label: '04 / Chân lý' },
  { id: 'practice', label: '05 / Thực tiễn' },
  { id: 'application', label: '06 / Vận dụng' },
  { id: 'review', label: '07 / Ôn tập' },
]

const schools = [
  { title: 'Duy tâm chủ quan', thinkers: 'Béccơli · E. Makhơ · Phichtơ', summary: 'Đề cao cảm giác, kinh nghiệm hoặc suy diễn chủ quan; dễ đồng nhất cái con người nghĩ về sự vật với chính sự vật.', accent: 'indigo', detail: 'Béccơli cho rằng chân lý gắn với sự phù hợp giữa suy diễn về sự vật và sự vật trên thực tế; Makhơ coi sự vật là phức hợp cảm giác; Phichtơ nhấn mạnh nhận thức các cảm giác của con người.' },
  { title: 'Duy tâm khách quan', thinkers: 'Platôn · Hêghen', summary: 'Thừa nhận nhận thức nhưng giải thích bằng thế giới ý niệm hoặc tinh thần thế giới, tách khỏi cơ sở vật chất của hiện thực.', accent: 'violet', detail: 'Platôn xem nhận thức là sự hồi tưởng về thế giới ý niệm; Hêghen giải thích nhận thức như quá trình tự ý thức của tinh thần thế giới.' },
  { title: 'Hoài nghi & bất khả tri', thinkers: 'Hium · Cantơ', summary: 'Nghi ngờ khả năng nhận thức hoặc giới hạn tri thức con người ở hiện tượng, không thể vươn tới bản chất.', accent: 'blue', detail: 'Hium nghi ngờ khả năng nhận thức và sự tồn tại khách quan của sự vật; Cantơ phân biệt hiện tượng con người biết được với “vật tự nó” không thể biết đầy đủ.' },
  { title: 'Duy vật trước Mác', thinkers: 'Duy vật siêu hình', summary: 'Công nhận thế giới khách quan nhưng xem phản ánh như sao chép thụ động, chưa thấy vai trò của hoạt động thực tiễn.', accent: 'mint', detail: 'Hạn chế cốt lõi là tính trực quan, siêu hình: nhận thức bị xem như sự phản ánh giản đơn, đứng yên, chưa được đặt trong quá trình vận động và cải tạo hiện thực.' },
]

const truthProperties = [
  { no: '01', title: 'Tính khách quan', keyword: 'Không phụ thuộc ý muốn', body: 'Nội dung chân lý phải phản ánh đúng hiện thực khách quan, không phụ thuộc lợi ích, quy ước hay sự tán thành của số đông.' },
  { no: '02', title: 'Tính cụ thể', keyword: 'Đúng trong điều kiện xác định', body: 'Không có chân lý trừu tượng, chung chung. Chân lý luôn gắn với không gian, thời gian và hoàn cảnh lịch sử cụ thể.' },
  { no: '03', title: 'Tính tương đối', keyword: 'Đúng nhưng chưa đầy đủ', body: 'Tri thức có thể phản ánh đúng một mặt, một bộ phận hiện thực trong giới hạn nhất định; nhận thức còn phải tiếp tục phát triển.' },
  { no: '04', title: 'Tính tuyệt đối', keyword: 'Tổng số biện chứng', body: 'Chân lý tuyệt đối không tách rời các chân lý tương đối; con người ngày càng tiến gần hơn đến sự phản ánh đầy đủ hiện thực.' },
]

const practiceForms = [
  { icon: FlaskConical, title: 'Sản xuất vật chất', body: 'Hoạt động cơ bản quyết định sự tồn tại và phát triển của xã hội; biến tri thức về tự nhiên thành năng lực cải tạo tự nhiên.' },
  { icon: Target, title: 'Chính trị – xã hội', body: 'Hoạt động cải biến các quan hệ xã hội, đấu tranh vì công bằng, tự do, tiến bộ và lợi ích chính đáng của con người.' },
  { icon: Lightbulb, title: 'Thực nghiệm khoa học', body: 'Tạo điều kiện nhân tạo để kiểm tra giả thuyết, phát hiện quy luật và phát triển phương pháp, công nghệ mới.' },
]

const quizQuestions = [
  { question: 'Đặc tính nào khẳng định nội dung chân lý không phụ thuộc vào con người và loài người?', options: ['Tính cụ thể', 'Tính khách quan', 'Tính tuyệt đối', 'Tính tương đối'], answer: 1, explanation: 'Tính khách quan khẳng định nội dung chân lý phải phù hợp với hiện thực khách quan, không phụ thuộc vào ý muốn hay quy ước chủ quan.' },
  { question: 'Theo C. Mác, vấn đề tư duy có đạt tới chân lý khách quan hay không là…', options: ['Một vấn đề lý luận thuần túy', 'Một sự đồng thuận của số đông', 'Một vấn đề thực tiễn', 'Một cảm nhận chủ quan'], answer: 2, explanation: 'Mệnh đề này nhấn mạnh phải đưa tư duy vào hoạt động thực tiễn để kiểm nghiệm.' },
  { question: 'Con đường biện chứng của nhận thức chân lý được khái quát như thế nào?', options: ['Từ cảm giác đến số đông', 'Từ trực quan sinh động đến tư duy trừu tượng, rồi trở về thực tiễn', 'Từ thực tiễn đến cảm giác, bỏ qua tư duy', 'Từ suy diễn chủ quan đến lợi ích'], answer: 1, explanation: 'Đây là quá trình từ nhận thức cảm tính, qua nhận thức lý tính, trở về thực tiễn để kiểm nghiệm.' },
  { question: '“Không có chân lý trừu tượng, chung chung, chân lý luôn là…”', options: ['Bất biến', 'Cụ thể', 'Số đông', 'Có lợi'], answer: 1, explanation: 'Tính cụ thể yêu cầu xem xét sự vật trong điều kiện không gian, thời gian và hoàn cảnh xác định.' },
  { question: 'Hạn chế quan trọng của chủ nghĩa duy vật trước Mác là gì?', options: ['Phủ nhận thế giới khách quan', 'Coi nhận thức là phản ánh thụ động, chưa thấy vai trò thực tiễn', 'Đề cao tinh thần thế giới', 'Phủ nhận khả năng nhận thức'], answer: 1, explanation: 'Họ thừa nhận thế giới khách quan nhưng còn hiểu sự phản ánh theo lối siêu hình, máy móc.' },
]

const references = [
  { label: 'TÀI LIỆU MÔN HỌC', title: 'Giáo trình Triết học Mác – Lênin, MLN111', meta: 'Phần III · Nhận thức và chân lý · tr. 138–153', note: 'Nguồn nền được dùng để giữ lại các khái niệm, luận điểm và câu hỏi ôn tập của bài học trước trong project.' },
  { label: 'V.I. LÊNIN', title: 'Chủ nghĩa duy vật và chủ nghĩa kinh nghiệm phê phán', meta: 'Cơ sở lý luận về chân lý khách quan', note: 'Dùng để đối chiếu cách trình bày các phạm trù vật chất, ý thức, nhận thức và chân lý trong truyền thống triết học Mác – Lênin.' },
  { label: 'VẬN DỤNG THỜI ĐẠI SỐ', title: 'Kiểm chứng một claim do AI tạo ra', meta: 'Ví dụ phương pháp · không phải phần lý luận trung tâm', note: 'AI chỉ được dùng như tình huống vận dụng: tách claim, kiểm tra nguồn, đưa vào thực tiễn và nhận diện sai lầm.' },
  { label: 'NGUỒN CHUẨN', title: 'NIST AI Risk Management Framework 1.0', meta: 'NIST · 2023 · Measure / TEVV', url: 'https://doi.org/10.6028/NIST.AI.100-1', note: 'Nguồn vận dụng cho thấy kiểm chứng AI cần có phương pháp, phép đo, điều kiện đánh giá và tài liệu hóa kết quả. Đây là framework tự nguyện, không thay thế giáo trình Triết học Mác – Lênin.' },
  { label: 'BENCHMARK', title: 'Introducing SimpleQA', meta: 'OpenAI · 2024 · 4.326 câu hỏi ngắn', url: 'https://openai.com/index/introducing-simpleqa/', note: 'Ví dụ về một benchmark được thiết kế cho câu hỏi tìm kiếm sự thật, có đáp án có thể xác minh. Chỉ dùng như minh họa phương pháp đo, không dùng để thay thế lập luận triết học.' },
]

const auditPractice = [
  { no: '01', label: 'CLAIM', title: 'Tách mệnh đề trước khi phán đoán', body: 'Không đánh giá cả một câu trả lời như một khối. Hãy tách các mệnh đề có thể đúng, sai hoặc chưa đủ dữ kiện.', check: 'Câu hỏi kiểm tra: Mệnh đề cụ thể là gì? Có từ tuyệt đối như “luôn”, “mọi”, “chắc chắn” không?' },
  { no: '02', label: 'NGUỒN', title: 'Đối chiếu nguồn với phạm vi claim', body: 'Một đường link chỉ là điểm bắt đầu. Nguồn phải nói đúng về mệnh đề, đúng thời điểm và đủ mạnh cho kết luận.', check: 'Câu hỏi kiểm tra: Nguồn có thật sự hỗ trợ toàn bộ câu nói hay chỉ hỗ trợ một phần?' },
  { no: '03', label: 'THỰC TIỄN', title: 'Đưa tri thức vào điều kiện cụ thể', body: 'Ghi lại bối cảnh, tiêu chí pass/fail, dữ liệu quan sát được và điều kiện khiến nhận định có thể thất bại.', check: 'Câu hỏi kiểm tra: Kết quả thực tế có xác nhận, giới hạn hay phủ định claim?' },
]

function App() {
  const [activeSection, setActiveSection] = useState('opening')
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSchool, setActiveSchool] = useState(0)
  const [activeAuditStep, setActiveAuditStep] = useState(0)
  const [openReference, setOpenReference] = useState(null)
  const [quizAnswers, setQuizAnswers] = useState({})

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -65% 0px', threshold: [0.1, 0.4, 0.8] })
    navItems.forEach(({ id }) => { const section = document.getElementById(id); if (section) observer.observe(section) })
    return () => observer.disconnect()
  }, [])

  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); setMenuOpen(false) }
  const score = Object.entries(quizAnswers).filter(([index, answer]) => quizQuestions[Number(index)].answer === answer).length

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">Bỏ qua đến nội dung chính</a>
      <header className="topbar">
        <div className="topbar-inner">
          <button className="brand-mark" onClick={() => scrollTo('opening')} aria-label="Về đầu bài trình bày"><span className="brand-symbol"><ShieldCheck size={18} strokeWidth={2.5} /></span><span>LÝ LUẬN NHẬN THỨC <i>/</i> CHÂN LÝ</span></button>
          <div className="topbar-meta"><span className="status-dot" /> TRIẾT HỌC MÁC – LÊNIN <span className="meta-divider" /> MLN111</div>
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Mở mục lục"><Menu size={20} aria-hidden="true" /></button>
        </div>
        <nav className={`section-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Mục lục bài học">{navItems.map((item) => <button key={item.id} className={activeSection === item.id ? 'active' : ''} onClick={() => scrollTo(item.id)}>{item.label}</button>)}</nav>
        <div className="progress-rail"><span style={{ width: `${((navItems.findIndex((item) => item.id === activeSection) + 1) / navItems.length) * 100}%` }} /></div>
      </header>

      <main id="main">
        <section id="opening" className="hero section-shell">
          <div className="hero-grid grid-lines"><div className="hero-copy"><div className="eyebrow"><span className="eyebrow-index">00</span> BÀI HỌC TƯƠNG TÁC · PHẦN III</div><h1>Lý luận<br /><em>nhận thức</em><br />và chân lý.</h1><p className="hero-lede">Từ những tranh luận về khả năng nhận thức đến kết luận có tính phương pháp luận: <strong>thực tiễn là cơ sở, động lực, mục đích và tiêu chuẩn kiểm tra chân lý</strong>.</p><div className="hero-actions"><button className="button button-primary" onClick={() => scrollTo('theory')}>Bắt đầu bài học <ArrowRight size={16} /></button><button className="text-button" onClick={() => scrollTo('practice')}>Đến luận điểm trung tâm <ArrowDownRight size={16} /></button></div></div><div className="hero-art" aria-label="Sơ đồ con đường biện chứng của nhận thức"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="claim-node node-top"><BookOpen size={16} /><span>TRỰC QUAN</span><strong>cảm tính</strong></div><div className="proof-line line-one"><span>khái quát</span></div><div className="claim-node node-mid"><Lightbulb size={16} /><span>TƯ DUY</span><strong>lý tính</strong></div><div className="proof-line line-two"><span>kiểm nghiệm</span></div><div className="claim-node node-bottom"><Target size={16} /><span>THỰC TIỄN</span><strong>chân lý</strong></div><div className="hero-stamp">MLN<br />111 <span>III</span></div></div></div>
          <div className="hero-bottom"><div><span className="tiny-label">VẤN ĐỀ</span><p>Con người có khả năng nhận thức thế giới và đạt tới chân lý khách quan không?</p></div><div><span className="tiny-label">LUẬN ĐIỂM TRUNG TÂM</span><p>Chỉ thông qua hoạt động thực tiễn, tri thức mới được vật chất hóa và kiểm nghiệm.</p></div><div><span className="tiny-label">PHẠM VI</span><p>Các quan niệm lịch sử · nhận thức · chân lý · thực tiễn · vận dụng.</p></div></div>
        </section>

        <section id="schools" className="section-shell light-section"><SectionHeading index="01" kicker="CÁC QUAN NIỆM TRONG LỊCH SỬ" title={<>Một câu hỏi cũ:<br /><em>ta biết thế giới bằng cách nào?</em></>} desc="Triết học Mác – Lênin kế thừa những hạt nhân hợp lý, đồng thời khắc phục cách nhìn phiến diện về chủ thể, khách thể và hoạt động nhận thức." /><div className="schools-layout"><div className="school-list">{schools.map((school, index) => <button key={school.title} className={`school-row ${activeSchool === index ? 'active' : ''}`} onClick={() => setActiveSchool(index)}><span className="school-no">0{index + 1}</span><span><strong>{school.title}</strong><small>{school.thinkers}</small></span><ArrowRight size={16} /></button>)}</div><div className={`school-detail ${schools[activeSchool].accent}`}><div className="card-kicker"><BookOpen size={16} /> ĐỌC GẦN HƠN</div><h3>{schools[activeSchool].title}</h3><p className="school-summary">{schools[activeSchool].summary}</p><div className="school-detail-line" /><p>{schools[activeSchool].detail}</p><span className="school-tag">{schools[activeSchool].thinkers}</span></div></div><div className="lesson-note"><Info size={16} /><span><strong>Điểm chuyển của Mác – Lênin:</strong> nhận thức không phải bản sao thụ động của thế giới, mà là quá trình biện chứng, tích cực, sáng tạo, gắn với hoạt động thực tiễn của con người.</span></div></section>

        <section id="theory" className="section-shell dark-section"><SectionHeading dark index="02" kicker="LÝ LUẬN NHẬN THỨC DUY VẬT BIỆN CHỨNG" title={<>Nhận thức là sự phản ánh<br /><em>tích cực và sáng tạo.</em></>} desc="Thế giới vật chất tồn tại khách quan; con người có khả năng nhận thức thế giới, nhưng tri thức luôn hình thành trong một quá trình vận động và được kiểm tra bằng thực tiễn." /><div className="definition-board"><div><span className="board-label">ĐỊNH NGHĨA LÀM VIỆC</span><p>Nhận thức là quá trình phản ánh hiện thực khách quan vào bộ óc người; không phải sự phản ánh thụ động, giản đơn mà là quá trình biện chứng, tích cực, sáng tạo.</p></div><div className="theory-pillars"><div><strong>01</strong><span>Thế giới khách quan</span></div><div><strong>02</strong><span>Khả năng nhận thức</span></div><div><strong>03</strong><span>Vai trò của thực tiễn</span></div></div></div><div className="dialectics-grid"><div className="dialectics-intro"><span className="board-label">CON ĐƯỜNG BIỆN CHỨNG</span><p>Không dừng ở cảm giác, cũng không khép lại trong suy luận. Nhận thức phải quay trở lại đời sống.</p><div className="quote-mini"><Quote size={15} /> “Từ trực quan sinh động đến tư duy trừu tượng, và từ tư duy trừu tượng đến thực tiễn...”</div></div><div className="dialectics-steps"><Step no="01" title="Trực quan sinh động" body="Cảm giác, tri giác, biểu tượng — phản ánh những đặc điểm bề ngoài, trực tiếp của sự vật." /><Step no="02" title="Tư duy trừu tượng" body="Khái niệm, phán đoán, suy lý — đi sâu khái quát bản chất và quy luật vận động." /><Step no="03" title="Trở về thực tiễn" body="Đưa tri thức vào hoạt động thực tế để khẳng định, bổ sung hoặc phủ định nhận định sai." /></div></div></section>

        <section id="truth" className="section-shell paper-section"><SectionHeading index="03" kicker="BẢN CHẤT VÀ TÍNH CHẤT CỦA CHÂN LÝ" title={<>Chân lý là tri thức<br /><em>phù hợp với hiện thực.</em></>} desc="Theo quan điểm duy vật biện chứng, chân lý không phải là cảm giác chủ quan hay sự đồng thuận đơn thuần; đó là tri thức phù hợp với hiện thực khách quan và được thực tiễn kiểm nghiệm." /><div className="truth-grid">{truthProperties.map((property) => <article className="truth-card" key={property.no}><span className="property-no">{property.no}</span><h3>{property.title}</h3><span className="property-keyword">{property.keyword}</span><p>{property.body}</p></article>)}</div><div className="comparison-block"><div className="comparison-title"><span className="tiny-label">PHÂN BIỆT</span><h3>Chân lý không đồng nhất với điều “có vẻ đúng”.</h3></div><div className="comparison-table"><div className="table-head"><span>Tiêu chí</span><span>Niềm tin / ý kiến chủ quan</span><span>Chân lý khách quan</span></div><div><strong>Cơ sở</strong><span>Cảm giác, lợi ích trước mắt, số đông.</span><span>Phản ánh đúng hiện thực và quy luật khách quan.</span></div><div><strong>Điều kiện</strong><span>Thường bỏ qua không gian, thời gian, hoàn cảnh.</span><span>Gắn với điều kiện cụ thể của sự vật.</span></div><div><strong>Kiểm tra</strong><span>Dựa vào sự hiển nhiên hoặc sức thuyết phục.</span><span>Được kiểm nghiệm bằng hoạt động thực tiễn.</span></div></div></div></section>

        <section id="practice" className="section-shell dark-section practice-section"><SectionHeading dark index="04" kicker="THỰC TIỄN LÀ TIÊU CHUẨN CỦA CHÂN LÝ" title={<>Thực tiễn không chỉ<br /><em>kiểm tra. Nó còn tạo ra tri thức.</em></>} desc="Thực tiễn là toàn bộ hoạt động vật chất – cảm tính, có tính lịch sử – xã hội của con người nhằm cải tạo tự nhiên và xã hội. Đây là luận điểm trung tâm của bài học." /><div className="practice-callout"><div className="practice-quote"><Quote size={22} /><p>“Vấn đề tìm hiểu xem tư duy của con người có thể đạt tới chân lý khách quan không, hoàn toàn không phải là một vấn đề lý luận mà là một vấn đề thực tiễn.”</p><span>— C. Mác, trích theo giáo trình MLN111</span></div><div className="practice-roles"><Role no="01" title="Cơ sở và nguồn gốc" body="Thực tiễn cung cấp tài liệu, kinh nghiệm và nhu cầu để nhận thức bắt đầu." /><Role no="02" title="Động lực" body="Mâu thuẫn và yêu cầu cải tạo hiện thực thúc đẩy tri thức phát triển." /><Role no="03" title="Mục đích" body="Nhận thức hướng về việc chỉ đạo, cải biến hoạt động thực tiễn, không phải để tích trữ." /><Role no="04" title="Tiêu chuẩn" body="Kết quả thực tiễn là thước đo khách quan để kiểm tra đúng – sai." /></div></div><div className="forms-grid">{practiceForms.map((form) => <article className="form-card" key={form.title}><form.icon size={20} /><h3>{form.title}</h3><p>{form.body}</p></article>)}</div><div className="practice-warning"><CircleAlert size={17} /><span><strong>Không thể lấy sự hiển nhiên, sự tán thành của số đông hoặc lợi ích trước mắt</strong> để thay thế cho tiêu chuẩn thực tiễn.</span></div></section>

        <section id="application" className="section-shell light-section"><SectionHeading index="05" kicker="VẬN DỤNG TRONG KỶ NGUYÊN SỐ" title={<>Từ tin tức đến thuật toán:<br /><em>đưa tri thức trở lại thực tế.</em></>} desc="Mạng xã hội và AI làm tăng tốc độ tạo – truyền thông tin. Nhưng nguyên tắc nhận thức không thay đổi: cảm tính → lý tính → thực tiễn → điều chỉnh." /><div className="digital-stages"><Stage no="01" title="Tiếp nhận" label="Trực quan sinh động" body="Một câu trả lời trôi chảy, một bài đăng nhiều lượt thích hay một lời hứa lợi nhuận tạo ra ấn tượng ban đầu. Ấn tượng chưa phải chân lý." /><Stage no="02" title="Phân tích" label="Tư duy trừu tượng" body="Tách mệnh đề, xem xét nguồn, đối chiếu dữ kiện, kiểm tra khái niệm và điều kiện áp dụng. Đây là lúc tư duy lý tính loại bỏ cái bề ngoài." /><Stage no="03" title="Kiểm nghiệm" label="Trở về thực tiễn" body="Thử nghiệm, quan sát kết quả, theo dõi hậu quả và đối chiếu với tiêu chí ban đầu. Nếu sai, sửa nhận định và quay lại vòng lặp nhận thức." /></div><div className="ai-case"><div className="ai-case-head"><span className="tiny-label">TÌNH HUỐNG VẬN DỤNG · KHÔNG PHẢI TRỌNG TÂM LÝ LUẬN</span><h3>Kiểm chứng một claim do AI tạo ra</h3><p>AI ở đây chỉ là ví dụ thời đại số để minh họa việc dùng thực tiễn làm tiêu chuẩn kiểm nghiệm chân lý.</p></div><div className="ai-flow"><div><span>CLAIM</span><strong>“Một câu trả lời có nguồn luôn đúng.”</strong></div><ArrowRight size={18} /><div><span>NGUỒN</span><strong>Kiểm tra nguồn có thật sự hỗ trợ toàn bộ claim?</strong></div><ArrowRight size={18} /><div><span>THỰC TIỄN</span><strong>Thử trong bối cảnh cụ thể; nếu thất bại, phải bác bỏ hoặc giới hạn claim.</strong></div></div><div className="audit-practice"><div className="audit-step-tabs">{auditPractice.map((step, index) => <button key={step.no} className={activeAuditStep === index ? 'active' : ''} onClick={() => setActiveAuditStep(index)}><span>{step.no}</span>{step.label}</button>)}</div><div className="audit-step-detail"><span className="tiny-label">{auditPractice[activeAuditStep].label}</span><h4>{auditPractice[activeAuditStep].title}</h4><p>{auditPractice[activeAuditStep].body}</p><div><CircleAlert size={15} /> {auditPractice[activeAuditStep].check}</div></div></div><div className="ai-integrity"><ShieldCheck size={18} /><div><strong>Minh bạch sử dụng AI</strong><p>AI chỉ hỗ trợ gợi ý bố cục, diễn đạt và ví dụ vận dụng. Nội dung Triết học Mác – Lênin được đối chiếu với giáo trình và tài liệu project; nhóm chịu trách nhiệm kiểm tra bản cuối.</p></div></div></div></section>

        <section id="review" className="section-shell paper-section"><SectionHeading index="06" kicker="ÔN TẬP VÀ PHẢN BIỆN" title={<>Hiểu lý luận bằng cách<br /><em>tự kiểm tra lập luận.</em></>} desc="Bài học kết thúc bằng năm câu hỏi ôn tập và các câu hỏi phản biện thường gặp. Hãy chọn đáp án, sau đó đọc lý do." /><div className="quiz-header"><div><span className="tiny-label">TRẮC NGHIỆM NHANH</span><h3>{Object.keys(quizAnswers).length === quizQuestions.length ? `Bạn đúng ${score}/${quizQuestions.length} câu` : `${Object.keys(quizAnswers).length}/${quizQuestions.length} câu đã trả lời`}</h3></div><button className="reset-button" onClick={() => setQuizAnswers({})}>Làm lại</button></div><div className="quiz-list">{quizQuestions.map((item, index) => <QuizItem key={item.question} index={index} item={item} selected={quizAnswers[index]} onSelect={(answer) => setQuizAnswers((current) => ({ ...current, [index]: answer }))} />)}</div><div className="debate-grid"><div className="debate-intro"><span className="tiny-label">PHẢN BIỆN</span><h3>Ba câu hỏi không thể trả lời bằng khẩu hiệu.</h3></div><div className="debate-card"><strong>01 / Số đông có phải thực tiễn?</strong><p>Không đồng nhất. Sự tán thành là trạng thái chủ quan; thực tiễn là hoạt động vật chất – xã hội, nơi quy luật khách quan bộc lộ qua kết quả.</p></div><div className="debate-card"><strong>02 / Chân lý có thay đổi theo thời gian?</strong><p>Chân lý có tính cụ thể, tương đối và tuyệt đối. Tri thức đúng trong điều kiện cũ có thể được bổ sung khi điều kiện và thực tiễn phát triển.</p></div><div className="debate-card"><strong>03 / Điều có lợi có phải chân lý?</strong><p>Không. Lợi ích chủ quan có thể trùng hợp tạm thời với kết quả đúng, nhưng không thể thay thế sự phù hợp với hiện thực khách quan.</p></div></div><div className="references-block"><div className="sources-head"><div><span className="tiny-label">TÀI LIỆU VÀ GHI CHÚ</span><h3>Giữ lý luận làm trục, vận dụng làm cầu nối.</h3></div><span className="source-count">{references.length} mục</span></div><div className="sources-grid">{references.map((reference) => <button className="source-card" key={reference.title} onClick={() => setOpenReference(reference)}><span className="source-label">{reference.label}</span><strong>{reference.title}</strong><span className="source-meta">{reference.meta}</span><ExternalLink size={15} /></button>)}</div></div></section>
      </main>

      <footer className="footer"><div><span className="brand-symbol"><ShieldCheck size={17} /></span><strong>LÝ LUẬN NHẬN THỨC / CHÂN LÝ</strong></div><p>Web presentation · Triết học Mác – Lênin · MLN111</p><span className="footer-note">Nội dung bám theo tài liệu bài học trong project; phần AI chỉ là ví dụ vận dụng ở thời đại số.</span></footer>
      {openReference && <div className="modal-backdrop" role="presentation" onClick={() => setOpenReference(null)}><div className="source-modal" role="dialog" aria-modal="true" aria-label={openReference.title} onClick={(event) => event.stopPropagation()}><div className="modal-top"><span className="source-label">{openReference.label}</span><button className="icon-button" onClick={() => setOpenReference(null)} aria-label="Đóng"><X size={18} /></button></div><h2>{openReference.title}</h2><p className="source-meta">{openReference.meta}</p><p>{openReference.note}</p>{openReference.url && <a className="button button-primary" href={openReference.url} target="_blank" rel="noreferrer">Mở nguồn gốc <ExternalLink size={15} /></a>}<button className="button button-dark" onClick={() => setOpenReference(null)}>Đóng ghi chú <Check size={15} /></button></div></div>}
    </div>
  )
}

function SectionHeading({ index, kicker, title, desc, dark = false }) { return <div className={`section-heading ${dark ? 'dark' : ''}`}><div className="section-index"><span>{index}</span><i /></div><div><div className="eyebrow"><span className="eyebrow-index">{index}</span> {kicker}</div><h2>{title}</h2><p>{desc}</p></div></div> }
function Step({ no, title, body }) { return <div className="step-card"><div className="step-top"><span>{no}</span><ArrowRight size={17} /></div><h3>{title}</h3><p>{body}</p></div> }
function Role({ no, title, body }) { return <div className="role-row"><span>{no}</span><div><strong>{title}</strong><p>{body}</p></div></div> }
function Stage({ no, title, label, body }) { return <article className="stage-card"><span className="stage-no">{no}</span><span className="stage-label">{label}</span><h3>{title}</h3><p>{body}</p></article> }
function QuizItem({ index, item, selected, onSelect }) { const answered = selected !== undefined; return <article className={`quiz-item ${answered ? 'answered' : ''}`}><div className="quiz-question"><span>{String(index + 1).padStart(2, '0')}</span><h3>{item.question}</h3></div><div className="quiz-options">{item.options.map((option, optionIndex) => <button key={option} className={`${answered && optionIndex === item.answer ? 'correct' : ''} ${answered && selected === optionIndex && selected !== item.answer ? 'incorrect' : ''}`} onClick={() => onSelect(optionIndex)} disabled={answered}><span>{String.fromCharCode(65 + optionIndex)}</span>{option}</button>)}</div>{answered && <div className={`quiz-feedback ${selected === item.answer ? 'good' : 'bad'}`}><Check size={15} /><span>{selected === item.answer ? 'Chính xác.' : 'Chưa đúng.'} {item.explanation}</span></div>}</article> }

export default App
