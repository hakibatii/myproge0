
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const PrivacyPolicy = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();

  return (
    <div className="page-container bg-gray-50 dark:bg-morocco-navy/90 pb-20">
      <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-800">
        <button onClick={() => navigate("/account")} className="mr-4">
          <ChevronRight className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-bold flex-1 rtl">{t("privacy_policy")}</h1>
      </div>

      <div className="p-6 rtl text-right overflow-auto">
        <h1 className="text-2xl font-bold mb-4">سياسة الخصوصية لتطبيق "Trip Maroc"</h1>
        <p className="mb-4"><strong>تاريخ السريان:</strong> 14 مايو 2025</p>
        <p className="mb-4">تلتزم "Trip Maroc" بحماية خصوصيتك وتوفير تجربة آمنة عند استخدام التطبيق. تهدف سياسة الخصوصية هذه إلى إبلاغك بكيفية جمع واستخدام وحماية معلوماتك الشخصية عند استخدامك لتطبيقنا.</p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3">1. المعلومات التي نجمعها</h2>
        <p className="mb-3">نقوم بجمع أنواع مختلفة من المعلومات لضمان تقديم خدمة فعّالة وآمنة:</p>
        <ul className="list-disc pr-5 mb-4 space-y-1">
          <li><strong>المعلومات الشخصية:</strong> مثل الاسم، البريد الإلكتروني، رقم الهاتف.</li>
          <li><strong>المعلومات التعريفية:</strong> مثل صور بطاقات الهوية، واستخدام نظام التعرف على الوجه لأغراض الأمان.</li>
          <li><strong>الموقع الجغرافي:</strong> بيانات الموقع الجغرافي أثناء استخدامك للتطبيق.</li>
          <li><strong>بيانات الاستخدام:</strong> تشمل المعلومات المتعلقة بتفاعل المستخدم مع التطبيق، مثل الصفحات التي تمت زيارتها، الأوقات التي قضيتها داخل التطبيق، وغيرها من الأنشطة.</li>
        </ul>
        
        <h2 className="text-xl font-semibold mt-6 mb-3">2. كيفية استخدام المعلومات</h2>
        <p className="mb-3">نستخدم المعلومات التي نقوم بجمعها للأغراض التالية:</p>
        <ul className="list-disc pr-5 mb-4 space-y-1">
          <li>تحسين أداء التطبيق وتقديم خدمات مخصصة.</li>
          <li>التواصل معك لإرسال إشعارات تتعلق بالخدمات والعروض.</li>
          <li>تلبية متطلبات الأمان والتحقق من هوية المستخدم.</li>
          <li>تحليل استخدام التطبيق لتحسين تجربتك.</li>
        </ul>
        
        <h2 className="text-xl font-semibold mt-6 mb-3">3. إنشاء حساب واستخدام المعلومات</h2>
        <p className="mb-4">للوصول إلى تطبيق "Trip Maroc" واستخدامه، يتعين على المستخدم إنشاء حساب باستخدام البريد الإلكتروني أو رقم الهاتف. بعد إنشاء الحساب، سيطلب منك التطبيق تقديم معلومات شخصية إضافية مثل الاسم، العنوان، والصورة الشخصية. كما قد يُطلب منك تحميل صورة بطاقة هوية للتأكد من هويتك.</p>
        <p className="mb-4">نظام التعرف على الوجه يتم استخدامه عند فتح الحساب لمزيد من الأمان والحماية. نعمل على التأكد من أن هذه البيانات تُستخدم فقط لأغراض الأمان وحماية المستخدمين.</p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3">4. حماية المعلومات</h2>
        <p className="mb-4">نحن نلتزم بحماية بياناتك الشخصية باستخدام تقنيات الأمان المتقدمة مثل التشفير لحمايتها من الوصول غير المصرح به أو التلاعب بها.</p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3">5. مشاركة المعلومات</h2>
        <p className="mb-4">لن نقوم ببيع أو تأجير معلوماتك الشخصية لأطراف ثالثة. ومع ذلك، قد نشارك بعض المعلومات مع مزودي الخدمة الموثوقين الذين يساعدوننا في تشغيل التطبيق، بشرط أن يتعهدوا بالحفاظ على سرية معلوماتك.</p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3">6. تخزين البيانات</h2>
        <p className="mb-4">يتم تخزين المعلومات الشخصية والمعلومات الأخرى في خوادم آمنة. سنتخذ التدابير المناسبة للحفاظ على سلامة بياناتك طوال فترة استخدامك للتطبيق.</p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3">7. حقوقك</h2>
        <ul className="list-disc pr-5 mb-4 space-y-1">
          <li><strong>الوصول إلى البيانات:</strong> يحق لك طلب الوصول إلى المعلومات التي قمنا بجمعها عنك.</li>
          <li><strong>التعديل:</strong> يمكنك تعديل أو تحديث معلوماتك الشخصية في أي وقت عبر إعدادات الحساب.</li>
          <li><strong>الحذف:</strong> يمكنك طلب حذف حسابك والمعلومات الشخصية المتعلقة بك في حال لم تعد ترغب في استخدام التطبيق.</li>
        </ul>
        
        <h2 className="text-xl font-semibold mt-6 mb-3">8. التعديلات على سياسة الخصوصية</h2>
        <p className="mb-4">قد نقوم بتحديث هذه السياسة من وقت لآخر. سيتم إعلامك بأي تغييرات عبر إشعار داخل التطبيق أو من خلال بريد إلكتروني. يرجى مراجعة هذه السياسة بشكل دوري للبقاء على اطلاع.</p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3">9. التواصل معنا</h2>
        <p className="mb-4">إذا كانت لديك أي أسئلة حول سياسة الخصوصية هذه أو حول كيفية معالجة معلوماتك، يمكنك الاتصال بنا عبر البريد الإلكتروني: <a href="mailto:triipmaroc@gmail.com" className="text-morocco-turquoise underline">triipmaroc@gmail.com</a> أو عبر دعم التطبيق.</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
