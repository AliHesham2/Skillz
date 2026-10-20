# ‫‏ذاكرة المشروع‬

‫‏آخر تحديث: ٢٠ أكتوبر ٢٠٢٦.‬

## ‫‏إحنا بنعمل إيه‬

‫‏بنجمع مكتبة شخصية للتصميم وبناء الواجهات: حزم سكيلز مستقلة، ومكتبة مكوّنات React بالكود والبرومبت الأصلي. المستخدم عايز كل مجموعة منفصلة، وتجميع حزم السكيلز داخل skillz لتقليل الزحمة في بداية الفولدر.‬

## ‫‏التنظيم الحالي‬

```text
Designer/
  skillz/
    stitch-skills/
      skills/          (15 skills)
      manifest.json
      README.md
      SKILLS-GUIDE.md
    ui-ux-pro-max/
      skills/          (1 skill)
      manifest.json
      README.md
    21st-dev/
      skills/21st-ui/
      connection/
      manifest.json
      README.md
  components-library/
    3d-testimonials/
      prompt-original.txt
      code/
      README.md
    README.md
  MEMORY.md
  README.md
```

## ‫‏اللي اتعمل‬

- ‫‏اتفصلت Stitch وUI UX Pro Max في حزمتين، لكل واحدة ملفات المصدر وتعليمات التثبيت.‬
- ‫‏اتضافت سكيل 21st مستقلة، متكيّفة من المصدر الرسمي، ومعاها الترخيص ومراجعة المصدر في manifest.json.‬
- ‫‏اتثبتت 21st-ui في فولدر سكيلز Codex الشخصي، واتسجل اتصال 21st في إعدادات Codex العامة. النسخة هنا للتخزين والنقل، والنسخة المثبتة منفصلة عنها.‬
- ‫‏اتصال 21st بيستخدم https://21st.dev/api/mcp وهيدر x-api-key، من متغير البيئة API_KEY_21ST. المفتاح محفوظ في بيئة مستخدم Windows، مش في المكتبة دي.‬
- ‫‏نجح فحص السكيل، والمصادقة، واكتشاف الأدوات، وبحث فعلي للقراءة فقط عن pricing table. أدوات التوليد ما كانتش ظاهرة للحساب وقت الاختبار، وما اتعملش توليد أو شراء.‬
- ‫‏الخطة المجانية كانت بتسمح بنسخ مكوّنين يوميًا وقت المراجعة. راجع حدود الحساب الحالية قبل الاعتماد عليها.‬
- ‫‏اتضاف 3d-testimonials لمكتبة المكوّنات: البرومبت الأصلي محفوظ كما هو، والكود متقسم لخمس ملفات React وCSS. المكوّن لسه مش متصل بمشروع أو متجرب في المتصفح.‬
- ‫‏نسخة المكوّن الأصلية فيها خطأ text-econdary-foreground، وخيار autoFill غير منفذ، ومحتاجة مراجعة تقليل الحركة وإتاحة المحتوى المتكرر. ما عدلناش الأصل.‬
- ‫‏اتنقلت الحزم التلاتة تحت skillz مع التحقق إن ملفاتها اتنقلت من غير تغيير، واتحدّثت روابط دليل البداية.‬

## ‫‏بعد نقل الفولدر‬

- ‫‏انقل فولدر المشروع كله؛ الروابط الداخلية نسبية وبتفضل شغالة لو حافظت على التنظيم.‬
- ‫‏نقل المكتبة على نفس الجهاز مش بينقل أو يغيّر النسخ المثبتة في Codex أو إعداداته العامة.‬
- ‫‏على جهاز تاني: ثبّت السكيلز المطلوبة من مجلد skills داخل كل حزمة. راجع ملفات README قبل التثبيت.‬
- ‫‏لتثبيت 21st على جهاز تاني، افتح PowerShell داخل skillz/21st-dev وشغّل الأمر التالي. المثبّت بيحافظ على الإعدادات الأخرى وبيعمل نسخة احتياطية قبل إضافة الاتصال.‬

```powershell
python .\connection\install.py
& ".\connection\set-api-key.ps1"
```

- ‫‏أدخل مفتاح 21st محليًا، واقفل Codex بالكامل وافتحه تاني، وبعدها اختبر اكتشاف الأدوات والبحث. المفتاح مش بينتقل مع فولدر المشروع.‬
- ‫‏بعض أمثلة السكيلز الموروثة فيها مسارات مطلقة للجهاز القديم. عدّلها حسب موقع تثبيت السكيل على الجهاز الجديد؛ نقل المكتبة وحده مش بيخلي الأمثلة دي محمولة.‬
- ‫‏المفتاح السابق اتبعت في الشات. اتنصح المستخدم بتغييره وإدخال البديل محليًا؛ ما نفترضش إنه اتغير فعلًا.‬

## ‫‏قواعد الاستكمال‬

- ‫‏حافظ على فصل الحزم، وما تخلطش السكيلز بكود المكوّنات.‬
- ‫‏لكل مكوّن جديد فولدر باسمه داخل components-library، فيه البرومبت الأصلي والكود وتعليمات الاستخدام ومعلومات المصدر المتاحة.‬
- ‫‏احتفظ بالنسخة الأصلية قبل أي إصلاحات. ما تدّعيش إن المكوّن متجرب قبل دمجه والتحقق منه.‬
- ‫‏المستندات العربية تفضل Markdown بمحارف اتجاه Unicode: RLE وRLM قبل النص، وPDF بعده، بعد علامات العناوين والقوائم. ما تستخدمش أغلفة HTML في عارض Codex الحالي. اعزل الكود داخل السطر بـ LRI وPDI خارج backticks، وسيب الكود والروابط من غير تغيير.‬
- ‫‏محارف الاتجاه ما تفرضش محاذاة CSS لليمين أو تعكس أعمدة الجداول في عارض LTR، والعرض الحالي ما اتراجعش بصريًا.‬

## ‫‏إضافة Tilted Grid Hero‬

- ‫‏اتضاف مكوّن Tilted Grid Hero لمكتبة المكوّنات، مع البرومبت الأصلي بدون تغيير، وملف المكوّن والديمو، وتعليمات الدمج وملاحظات المراجعة. الكود محفوظ زي ما اتبعت؛ لسه ما اتدمجش أو اتجرب في المتصفح.‬

## ‫‏مكتبة Forma المشتركة‬

- ‫‏اتضاف npm workspace واحد، وحزمة React باسم Forma UI، وملعب تفاعلي لتجربة المكوّنات. ملفات DESIGN.md وAGENTS.md بتحدد نظام التصميم المشترك وقواعد إضافة المكوّنات الجديدة. الأصول المحفوظة فضلت من غير تعديل، والنسخ الحية المتكيّفة موجودة في packages/ui.‬

## ‫‏إزالة اتصال 21st‬

- ‫‏بناء على طلب المستخدم، اتشال اتصال MCP الخاص بـ21st من إعدادات Codex العامة. مكتبة المكوّنات والبرومبتات الأصلية ومشروع Forma فضلوا موجودين. نسخ السكيلز والأرشيف المحلي لم يتم حذفها.‬

## ‫‏الحالة الحالية لحزمة 21st‬

- ‫‏المستخدم طلب حذف حزمة 21st نفسها أيضا. تم حذف مجلد skillz/21st-dev؛ لا تعيد تثبيته أو إنشاءه. مكتبة المكونات ومشروع Forma محفوظان. الإشارات السابقة إلى الحزمة والتثبيت هي سجل تاريخي فقط.‬

## ‫‏حزمة سكيلز Frontend وDesign‬

- ‫‏اتجمعت النسخ المحلية في skillz/frontend-design-skills: اتضافت frontend-design من Anthropic مع الترخيص والمصدر وتنسيق الأدوار؛ واتنقلت ui-ux-pro-max من غير تغيير ملفاتها. Stitch فضلت مستقلة. الإضافة الجديدة محلية فقط ولم يتم تثبيتها في فولدر Codex الشخصي.‬

## ‫‏دمج إرشادات المواقع السينمائية‬

- ‫‏اتدمجت الإضافات المتخصصة من Build Awwwards-Quality Sites كمرجع اختياري داخل frontend-design، مع توثيق المصدر وترخيص MIT. الحركة والأدوات حسب احتياج المهمة؛ مفيش سكيل مكررة أو تعديل لـStitch أو تثبيت عام.‬

## ‫‏دمج Taste v2‬

- ‫‏اتضاف مرجع اختياري داخل frontend-design لمراجعة التصميم قبل التعديل، والتفريق بين صفحات التسويق وشاشات التطبيقات، والمقارنة البصرية. المصدر الرسمي Taste v2 وترخيص MIT موثقين. سكربتات ومكتبات المصدر لم يتم نسخها؛ لا تدعي توفر الفاحص الخاص به. الإضافة محلية فقط وStitch لم تتغير.‬

## ‫‏دمج إرشادات Emil للويب‬

- ‫‏اتدمجت الأجزاء المناسبة للويب من مجموعة Emil داخل frontend-design كمراجع للتفاعل والحركة وتشخيص الأداء واختبار الحالات الصعبة، واختيار المكتبات وSonner والبدائل عند الطلب. المصدر وترخيص MIT محفوظان. Swift وواجهات الموبايل الأصلية خارج النطاق، وStitch لم تتغير. مفيش تثبيت عام أو تشغيل npm.‬

## ‫‏دمج مراجعة واجهات Vercel‬

- ‫‏اتضاف مرجع اختياري لمراجعة تنفيذ الواجهات داخل frontend-design، مع الرجوع للإرشادات الرسمية الحالية وقت المراجعة وتوضيح حدود التحقق. المصدر المثبت وترخيص MIT محفوظين. قواعد الكتابة والتفضيلات مش معايير إلزامية عامة، وStitch والتثبيت الشخصي لم يتغيروا.‬

## ‫‏إضافة زر وHero وتطبيق إرشادات التصميم‬

- ‫‏اتضاف Lift Button وStudio Hero كأصول Forma جديدة داخل الحزمة، واتحفظ الطلب ونسخة المصدر الأولى في مكتبة المكونات. اتراجع تكوين Tilted Grid Hero واتضاف تحكم محلي في حركة Testimonials وحالة للبيانات الفارغة. كلهم بيستخدموا نفس الثيمات والألوان، والملعب بقى أربع مكونات مع روابط hash. لم يتم تثبيت السكيلز عالميًا أو تعديل Stitch.‬

## ‫‏إضافة المسار التقني لـGSAP‬

- ‫‏اتضافت مراجع GSAP الرسمية الثمانية داخل frontend-design مع فهرس اختياري وقواعد تمنع تعارض المحركات وملكية خصائص الحركة والـscroll. تم توضيح contextSafe والتنظيف في React. المصدر والترخيص مثبتين، ولم يتم تثبيت GSAP أو تعديل المكونات أو تشغيل npm.‬

## ‫‏إضافة React Best Practices‬

- ‫‏اتضافت vercel-react-best-practices كتخصص ثالث داخل الحزمة المحلية، مع ٧٠ قاعدة أصلية وتحديد قواعد React مقابل Next.js. اتشال الملف المجمّع المكرر وقالب التأليف من النسخة الجديدة. ترخيص MIT معلن في بيانات المصدر، ولم يوجد نص ترخيص منفصل في المراجعة. مفيش تثبيت عالمي أو تشغيل npm أو تعديل للمكونات أو Stitch.‬

## ‫‏مدخل موحد لأي AI Agent‬

- ‫‏اتضاف START-HERE.md كبرومبت تعريفي قابل للنقل يشرح الحزمة وتخصصاتها الثلاثة ومراجعها وStitch المستقلة وطريقة الاختيار والتحقق. اتربط من README وAGENTS.md، ومفيش تثبيت عام أو تشغيل npm.‬

## ‫‏توحيد الدليل والبرومبت داخل skillz‬

- ‫‏بناء على تصحيح المستخدم، البرومبت والدليل بقوا ملف skillz/README.md واحد. اتشال START-HERE.md من الجذر وREADME المكرر داخل frontend-design-skills بعد دمج المعلومات المفيدة، واتحدثت روابط الدخول. README الجذر خاص بتشغيل Forma، وStitch فضلت مستقلة.‬

## English agent prompts

The user prefers prompts in English. Converted skillz/README.md to English, including the combined agent guide and starter prompt, and recorded the default in AGENTS.md. Preserve archived original prompts and follow requested locales for interface copy and conversation.

## Fruity Slider conversion plan

Reviewed and archived the three supplied vanilla source files under components-library/fruity-slider/original. TODO.md records confirmed source findings and a phased React/Forma responsive conversion plan. The original uses GSAP 3.9.1 but no ScrollTrigger. Implementation has not started; no dependencies were installed and npm remains stopped.

## Fruity Slider implemented — 2026-10-20

Added React/TypeScript FruitySlider to @forma/ui with GSAP 3.15.0 in the root workspace, original can/atlas demo artwork stored locally, per-slide product-image support, responsive container composition, bounded retargeting navigation, keyboard/touch handlers, pause/reduced-motion handling, visibility-aware drift, and missing-artwork fallbacks. Fifth playground entry and English component README document API and actual browser checks. Preserved source archives. Browser checks covered 320/390/768/1024/about-1400px containers, both themes/all accents, boundaries/rapid reversal/resize/remount/multiple instances and zero/one/four-slide data. Physical touch and OS reduced motion remain unverified. Dev server was started for this task; check current process state before relying on that historical note.

## Fruity composition refinement — 2026-10-20

At the user’s request, wrote a TODO then separated flavor titles above the product, softened their weight, added clipped vertical GSAP exit/entry coordinated with scene/label travel, and repositioned fruit into a diagonal hierarchy. Narrow containers show two primary fruit pieces, fully inside the stage. Verified wide and 390px embed screenshots, all flavors, rapid reversal and pause. Required builds passed; original archives remain unchanged.

## Wildlife Slider and Forma full-window preview — 2026-10-20

Reviewed animated-slider-webpage and preserved its three original files unchanged. Created TODO before implementation. Added exported WildlifeSlider with typed data, eleven locally stored original photographs, expanding photo transition, responsive copy/thumbnail grid, circular arrows, direct selection, keyboard/swipe handling, missing-image fallback, zero/single data states, real photo-details toggle, and opt-in autoplay with owned timeout/visibility/focus/pause/reduced-motion handling. No dependencies added.

Added shared PreviewWorkbench to all six component views: diagonal arrow, native dialog filling browser viewport, preserved component state, inherited theme/accent, Escape/close/focus restoration and document scroll lock. Fullscreen here means browser-window area, not OS fullscreen. Tested Wildlife/Fruity state preservation and 320px modal fit. Builds and SSR exports passed; browser checks covered all photos, circular navigation, rapid reversal, 320/390/768/1024px embeds, empty/single/long/missing data, autoplay/pause and instance isolation/remount. Physical touch and OS reduced motion remain unverified. Temporary fixtures/build outputs cleaned. Dev server restarted to clear stale Vite CSS and left running for review.

## Fruity fruit-motion correction — 2026-10-20

The user identified that decorative fruit incorrectly travelled sideways inside the scene track. Moved fruit to stationary stage layers and added independent, staggered bottom-up entry/downward exit on separate wrappers, preserving the accepted composition and idle drift. Timeline cleanup/retargeting remains scoped; motion-off settles complete active fruit immediately. Browser DOM checks confirmed no track ancestry or horizontal transform, vertical entry returning to zero, outgoing layers hidden, rapid reversals, and mobile pause during entry. Physical touch was not exercised.

## Wildlife source-motion correction — 2026-10-20

The user rejected the replacement reveal animation. Restore imported motion semantics before polishing: Wildlife now keeps one photograph DOM element per slide, using original one-second CSS-ease absolute geometry transitions for expanding a thumbnail, shifting the rail, and shrinking the outgoing full image on Previous. Source copy stagger/100px entry/33px blur timings restored. Responsive slot measurements are scoped to the root with observer/RAF cleanup. Overflow clip prevents programmatic focus scrolling that displaced the root. Browser measurements confirmed intermediate expansion (127.5px toward 921px), reverse shrink (toward 127.5px), final full size, rapid retargeting and exact 390px hit-target alignment with pause. Original preview URL was client-blocked; comparison used original supplied CSS/JS, not a claimed side-by-side recording.

## Forma control alignment — 2026-10-20

The user clarified that the off-center arrows were the Fruity footer navigation. Replaced asymmetric footer flex distribution with equal side grid columns and centered navigation; narrow containers stack pause below the centered arrows. Native arrow glyphs became centered SVGs. Forma preview width remains a native select but now has appearance reset, reserved trailing padding and an inherited-color SVG chevron inset 16px. Toolbar margins/vertical alignment were unified. Browser geometry confirmed zero navigation-center offset, zero select-chevron vertical offset, and matching toolbar control centers. Scene artwork and animation were unchanged.


## Directional fruit, compact masking and shared motion controls — 2026-10-20

User clarified the original directional fruit behavior: Next/right enters from above moving down; Previous/left enters from below moving up. Updated the scoped GSAP entry direction and added separate stationary ground shadows with entry/exit fades, preserving the accepted composition and independent idle drift. Browser computed transforms showed negative entry displacement for Next and positive for Previous, both settling to zero. Rapid reversal, external pause and 390px embeds checked; two primary shadows remain visible on narrow embeds.

Added optional showControls (default true) to FruitySlider and WildlifeSlider; Forma passes false on both plus Testimonials, in detail previews and collection thumbnails. The external toolbar remains available in inline and full-window previews. Verified zero local control elements in all three Forma integrations; standalone defaults retain their controls.

Moved TiltedGridHero's static edge mask onto an outer wrapper, separate from the inner perspective scene. Retained individual facet culling and source cylinder motion. Browser samples at compact widths 447.5px and 657.5px showed no hidden facets inside the central visible band; reviewed multiple exit phases and expanded preview screenshots without observing the reported white split. These sampled checks do not certify every rendered frame or other GPUs. Required app/library/declaration build passed. Original archived source files untouched.


## Wildlife compact desktop cards — 2026-10-20

At user request, capped the wide-container thumbnail rail at 480px, aligned it bottom-right across the copy/control grid rows, and confined desktop controls to the left column. At a 1870px stage, cards measure 152 by 203px and share the arrows bottom edge exactly (zero offset), leaving the main photograph exposed. Existing measured hit targets drive the original geometry transitions. Required app/library build passed; desktop and narrow embeds checked.


## Wildlife unrelated-photo flash — 2026-10-20

Reproduced Next from 01/11: the last parrot (the old previous underlay) faded out at z-index 0, painting over the outgoing eagle with the same z-index because of DOM order. Hidden cards now immediately move to z-index -1, below the actual previous background (0), active expansion (1) and visible rail (2). Verified in-flight parrot opacity still 1 but z-index -1, correct Owl 02/11, backward 01-to-11 wrap and rapid forward wrap/reversal with no hidden card above the outgoing background. App/library/declaration build passed.
