/* Hands for Africa — shared site script (multi-language)
   Language is read from <html lang="xx">. FAQ + donate modal strings live in
   I18N below; page copy is baked into each translated HTML file. */
(function () {
  'use strict';

  var LANG = (document.documentElement.getAttribute('lang') || 'en').toLowerCase().split('-')[0];

  /* ============================================================
     SHOPIFY CHECKOUT  ← connect real donations here (see README)
     ============================================================ */
  var CHECKOUT = {
    storeDomain: 'uqx4xd-4n.myshopify.com',
    variants: { 15000: '', 25000: '', 30000: '', 45000: '', 50000: '', 75000: '', 100000: '', Other: '' },
    urls: {                // Shopify Buy Button cart links (one variant per donation amount)
      15000:  'https://checkout.korapay.com/pay/handsforafrica',
      25000:  'https://checkout.korapay.com/pay/handsforafrica2',
      30000:  'https://checkout.korapay.com/pay/handsforafrica3',
      45000:  'https://checkout.korapay.com/pay/handsforafrica4',
      50000: 'https://checkout.korapay.com/pay/handsforafrica5',
      75000: 'https://checkout.korapay.com/pay/handsforafrica7',
      100000: 'https://checkout.korapay.com/pay/handsforafrica1',
      Other: 'https://checkout.korapay.com/pay/handsforafricax'
    }
  };
  function checkoutUrl(amount) {
    if (CHECKOUT.urls && CHECKOUT.urls[amount]) return CHECKOUT.urls[amount];
    var v = CHECKOUT.variants && CHECKOUT.variants[amount];
    if (CHECKOUT.storeDomain && v) return 'https://' + CHECKOUT.storeDomain + '/cart/' + v + ':1';
    return null;
  }

  /* ============================================================
     TRANSLATIONS — FAQ + donate modal + amount ladder
     ============================================================ */
  var I18N = {
    en: {
      faq: [
        ['How are donations used?', '92% of every donation goes directly to food, health and education programs on the ground. The remaining 8% covers administrative costs that are audited annually.'],
        ['Who oversees the money?', 'An independent board and an external auditor review all accounts every year. Our financial reports are public on the Transparency page.'],
        ['Does it really reach the children?', 'Yes. We work directly on the ground with no intermediaries. Funds go straight to our own field teams, who put food, medicine and school into the hands of a child.'],
        ['Is the payment secure?', 'All payments use the same encryption that banks use. We never store your card details on our servers.'],
        ['Can I get a tax receipt?', 'Yes. Donations are tax deductible in eligible countries, and you will receive your receipt by email automatically.'],
        ['How can I follow the impact?', 'After donating you will get updates with photos and stories showing exactly how your gift is changing a child’s life.']
      ],
      ladder: [
        { a: 15000, im: 'School supplies for 1 child' },
        { a: 25000, im: 'Full vaccinations for 5 children' },
        { a: 30000, im: 'A week of medical care for 3 children', s: true },
        { a: 45000, im: 'A month of meals for 2 children' },
        { a: 50000, im: 'A quarter scholarship for 1 child' },
        { a: 75000, im: 'Hygiene kits for 10 children' },
        { a: 100000, im: 'Full medical care for 5 children' },
        { a: Other, im: 'Supplies for a class of 30 children' }
      ],
      m: { eyebrow: 'Your gift, direct', title: 'Save a child today', suggested: 'Suggested', donate: 'Donate {amt} now', secure: '🔒 Secure payment · 100% reaches the field', thanksTitle: 'Thank you.', thanksBody: 'You gave {amt}. That is {impact}, starting today. A child will not go hungry tonight because of you.', back: 'Back to the page', close: 'Close' }
    },
    es: {
      faq: [
        ['¿Cómo se usan las donaciones?', 'El 92% de cada donación va directamente a programas de comida, salud y educación sobre el terreno. El 8% restante cubre costos administrativos, auditados cada año.'],
        ['¿Quién supervisa el dinero?', 'Una junta independiente y un auditor externo revisan todas las cuentas cada año. Nuestros informes financieros son públicos en la página de Transparencia.'],
        ['¿Realmente llega a los niños?', 'Sí. Trabajamos directamente sobre el terreno, sin intermediarios. Los fondos van directo a nuestros propios equipos de campo, que ponen comida, medicinas y escuela en las manos de un niño.'],
        ['¿El pago es seguro?', 'Todos los pagos usan el mismo cifrado que usan los bancos. Nunca guardamos los datos de tu tarjeta en nuestros servidores.'],
        ['¿Puedo recibir un recibo para impuestos?', 'Sí. Las donaciones son deducibles en los países elegibles y recibirás tu recibo por correo electrónico automáticamente.'],
        ['¿Cómo puedo seguir el impacto?', 'Después de donar recibirás novedades con fotos e historias que muestran exactamente cómo tu ayuda está cambiando la vida de un niño.']
      ],
      ladder: [
        { a: 15000, im: 'Material escolar para 1 niño' },
        { a: 25000, im: 'Vacunación completa para 5 niños' },
        { a: 30000, im: 'Una semana de atención médica para 3 niños', s: true },
        { a: 45000, im: 'Un mes de comidas para 2 niños' },
        { a: 50000, im: 'Un trimestre de beca para 1 niño' },
        { a: 75000, im: 'Kits de higiene para 10 niños' },
        { a: 100000, im: 'Atención médica completa para 5 niños' },
        { a: Other, im: 'Material para una clase de 30 niños' }
      ],
      m: { eyebrow: 'Tu ayuda, directa', title: 'Salva a un niño hoy', suggested: 'Sugerido', donate: 'Dona {amt} ahora', secure: '🔒 Pago seguro · El 100% llega al terreno', thanksTitle: 'Gracias.', thanksBody: 'Donaste {amt}. Eso es {impact}, a partir de hoy. Un niño no pasará hambre esta noche gracias a ti.', back: 'Volver a la página', close: 'Cerrar' }
    },
    fr: {
      faq: [
        ['Comment les dons sont-ils utilisés ?', '92 % de chaque don va directement aux programmes d’alimentation, de santé et d’éducation sur le terrain. Les 8 % restants couvrent les frais administratifs, audités chaque année.'],
        ['Qui contrôle l’argent ?', 'Un conseil indépendant et un auditeur externe examinent tous les comptes chaque année. Nos rapports financiers sont publics sur la page Transparence.'],
        ['Est-ce que cela atteint vraiment les enfants ?', 'Oui. Nous travaillons directement sur le terrain, sans intermédiaire. Les fonds vont droit à nos propres équipes de terrain, qui mettent nourriture, médicaments et école entre les mains d’un enfant.'],
        ['Le paiement est-il sécurisé ?', 'Tous les paiements utilisent le même chiffrement que les banques. Nous ne conservons jamais les données de votre carte sur nos serveurs.'],
        ['Puis-je recevoir un reçu fiscal ?', 'Oui. Les dons sont déductibles dans les pays éligibles et vous recevrez votre reçu par e-mail automatiquement.'],
        ['Comment suivre l’impact ?', 'Après votre don, vous recevrez des nouvelles avec des photos et des histoires montrant exactement comment votre geste change la vie d’un enfant.']
      ],
      ladder: [
        { a: 15000, im: 'Fournitures scolaires pour 1 enfant' },
        { a: 25000, im: 'Vaccination complète pour 5 enfants' },
        { a: 30000, im: 'Une semaine de soins médicaux pour 3 enfants', s: true },
        { a: 45000, im: 'Un mois de repas pour 2 enfants' },
        { a: 50000, im: 'Un trimestre de bourse pour 1 enfant' },
        { a: 75000, im: 'Kits d’hygiène pour 10 enfants' },
        { a: 100000, im: 'Soins médicaux complets pour 5 enfants' },
        { a: 1000+, im: 'Fournitures pour une classe de 30 enfants' }
      ],
      m: { eyebrow: 'Votre don, direct', title: 'Sauvez un enfant aujourd’hui', suggested: 'Suggéré', donate: 'Donner {amt} maintenant', secure: '🔒 Paiement sécurisé · 100 % arrive sur le terrain', thanksTitle: 'Merci.', thanksBody: 'Vous avez donné {amt}. C’est {impact}, dès aujourd’hui. Un enfant ne se couchera pas le ventre vide grâce à vous.', back: 'Retour à la page', close: 'Fermer' }
    },
    de: {
      faq: [
        ['Wie werden die Spenden verwendet?', '92 % jeder Spende fließen direkt in Programme für Ernährung, Gesundheit und Bildung vor Ort. Die restlichen 8 % decken Verwaltungskosten, die jährlich geprüft werden.'],
        ['Wer überwacht das Geld?', 'Ein unabhängiger Vorstand und ein externer Wirtschaftsprüfer prüfen jedes Jahr alle Konten. Unsere Finanzberichte sind auf der Transparenzseite öffentlich.'],
        ['Kommt es wirklich bei den Kindern an?', 'Ja. Wir arbeiten direkt vor Ort, ohne Zwischenhändler. Die Mittel gehen direkt an unsere eigenen Teams vor Ort, die einem Kind Essen, Medizin und Schule in die Hände legen.'],
        ['Ist die Zahlung sicher?', 'Alle Zahlungen verwenden dieselbe Verschlüsselung wie Banken. Wir speichern Ihre Kartendaten niemals auf unseren Servern.'],
        ['Bekomme ich eine Spendenquittung?', 'Ja. Spenden sind in berechtigten Ländern steuerlich absetzbar, und Sie erhalten Ihre Quittung automatisch per E-Mail.'],
        ['Wie kann ich die Wirkung verfolgen?', 'Nach Ihrer Spende erhalten Sie Updates mit Fotos und Geschichten, die genau zeigen, wie Ihr Beitrag das Leben eines Kindes verändert.']
      ],
      ladder: [
        { a: 15000, im: 'Schulmaterial für 1 Kind' },
        { a: 25000, im: 'Vollständige Impfungen für 5 Kinder' },
        { a: 30000, im: 'Eine Woche medizinische Versorgung für 3 Kinder', s: true },
        { a: 45000, im: 'Ein Monat Mahlzeiten für 2 Kinder' },
        { a: 50000, im: 'Ein Quartal Stipendium für 1 Kind' },
        { a: 75000, im: 'Hygienesets für 10 Kinder' },
        { a: 100000, im: 'Vollständige medizinische Versorgung für 5 Kinder' },
        { a: 1000+, im: 'Material für eine Klasse von 30 Kindern' }
      ],
      m: { eyebrow: 'Ihre Spende, direkt', title: 'Retten Sie heute ein Kind', suggested: 'Empfohlen', donate: 'Jetzt {amt} spenden', secure: '🔒 Sichere Zahlung · 100 % kommen vor Ort an', thanksTitle: 'Danke.', thanksBody: 'Sie haben {amt} gespendet. Das ist {impact}, ab heute. Ein Kind wird heute Nacht nicht hungrig schlafen, dank Ihnen.', back: 'Zurück zur Seite', close: 'Schließen' }
    },
    it: {
      faq: [
        ['Come vengono usate le donazioni?', 'Il 92% di ogni donazione va direttamente ai programmi di cibo, salute e istruzione sul campo. Il restante 8% copre i costi amministrativi, verificati ogni anno.'],
        ['Chi controlla il denaro?', 'Un consiglio indipendente e un revisore esterno controllano tutti i conti ogni anno. I nostri bilanci sono pubblici nella pagina Trasparenza.'],
        ['Arriva davvero ai bambini?', 'Sì. Lavoriamo direttamente sul campo, senza intermediari. I fondi vanno diritti alle nostre squadre sul campo, che mettono cibo, medicine e scuola nelle mani di un bambino.'],
        ['Il pagamento è sicuro?', 'Tutti i pagamenti usano la stessa crittografia delle banche. Non conserviamo mai i dati della tua carta sui nostri server.'],
        ['Posso avere una ricevuta fiscale?', 'Sì. Le donazioni sono deducibili nei paesi idonei e riceverai la tua ricevuta via e-mail automaticamente.'],
        ['Come posso seguire l’impatto?', 'Dopo la donazione riceverai aggiornamenti con foto e storie che mostrano esattamente come il tuo dono sta cambiando la vita di un bambino.']
      ],
      ladder: [
        { a: 15000, im: 'Materiale scolastico per 1 bambino' },
        { a: 25000, im: 'Vaccinazioni complete per 5 bambini' },
        { a: 30000, im: 'Una settimana di cure mediche per 3 bambini', s: true },
        { a: 45000, im: 'Un mese di pasti per 2 bambini' },
        { a: 50000, im: 'Un trimestre di borsa di studio per 1 bambino' },
        { a: 75000, im: 'Kit igienici per 10 bambini' },
        { a: 100000, im: 'Cure mediche complete per 5 bambini' },
        { a: 1000+, im: 'Materiale per una classe di 30 bambini' }
      ],
      m: { eyebrow: 'Il tuo dono, diretto', title: 'Salva un bambino oggi', suggested: 'Consigliato', donate: 'Dona {amt} adesso', secure: '🔒 Pagamento sicuro · Il 100% arriva sul campo', thanksTitle: 'Grazie.', thanksBody: 'Hai donato {amt}. È {impact}, da oggi. Un bambino non andrà a letto affamato stanotte grazie a te.', back: 'Torna alla pagina', close: 'Chiudi' }
    },
    ar: {
      faq: [
        ['كيف تُستخدم التبرعات؟', 'يذهب 92% من كل تبرع مباشرةً إلى برامج الغذاء والصحة والتعليم على الأرض. أمّا الـ 8% المتبقية فتغطي التكاليف الإدارية، وتُدقّق سنويًّا.'],
        ['من يشرف على الأموال؟', 'يراجع مجلسٌ مستقل ومدقّق خارجي جميع الحسابات كل عام. تقاريرنا المالية متاحة للجميع في صفحة الشفافية.'],
        ['هل تصل فعلاً إلى الأطفال؟', 'نعم. نعمل مباشرةً على الأرض دون وسطاء. تذهب الأموال مباشرةً إلى فرقنا الميدانية التي تضع الغذاء والدواء والمدرسة بين يدي الطفل.'],
        ['هل الدفع آمن؟', 'تستخدم جميع المدفوعات التشفير نفسه الذي تستخدمه البنوك. لا نحفظ بيانات بطاقتك على خوادمنا أبدًا.'],
        ['هل أحصل على إيصال ضريبي؟', 'نعم. التبرعات قابلة للخصم الضريبي في الدول المؤهلة، وسيصلك إيصالك عبر البريد الإلكتروني تلقائيًا.'],
        ['كيف أتابع الأثر؟', 'بعد التبرع ستصلك تحديثات بالصور والقصص توضّح تمامًا كيف يغيّر عطاؤك حياة طفل.']
      ],
      ladder: [
        { a: 15000, im: 'لوازم مدرسية لطفل واحد' },
        { a: 25000, im: 'تطعيمات كاملة لـ 5 أطفال' },
        { a: 30000, im: 'أسبوع من الرعاية الطبية لـ 3 أطفال', s: true },
        { a: 45000, im: 'شهر من الوجبات لطفلين' },
        { a: 50000, im: 'فصل دراسي من المنحة لطفل واحد' },
        { a: 75000, im: 'حقائب نظافة لـ 10 أطفال' },
        { a: 100000, im: 'رعاية طبية كاملة لـ 5 أطفال' },
        { a: 1000+, im: 'لوازم لفصل من 30 طفلاً' }
      ],
      m: { eyebrow: 'عطاؤك، مباشرة', title: 'أنقذ طفلاً اليوم', suggested: 'مقترح', donate: 'تبرّع بـ {amt} الآن', secure: '🔒 دفع آمن · 100% تصل إلى الميدان', thanksTitle: 'شكرًا لك.', thanksBody: 'لقد تبرّعت بـ {amt}. هذا يعني {impact}، ابتداءً من اليوم. لن ينام طفلٌ جائعًا الليلة بفضلك.', back: 'العودة إلى الصفحة', close: 'إغلاق' }
    }
  };
  var T = I18N[LANG] || I18N.en;
  function fmt(str, map) { return str.replace(/\{(\w+)\}/g, function (_, k) { return map[k]; }); }
  // Lowercase the first letter so an impact label reads naturally mid-sentence
  // ("That is full vaccinations…"). Skip German (capitalises nouns) and Arabic (no case).
  function lowerFirst(s) {
    if (!s || LANG === 'de' || LANG === 'ar') return s;
    return s.charAt(0).toLowerCase() + s.slice(1);
  }

  /* ---------- Photos: reveal a real image once it loads ---------- */
  document.querySelectorAll('.photo > img, .pcard > img').forEach(function (img) {
    var reveal = function () { img.parentElement.classList.add('has-img'); };
    if (img.complete && img.naturalWidth > 0) reveal();
    else img.addEventListener('load', reveal);
  });

  /* ---------- FAQ ---------- */
  var faqEl = document.getElementById('faq');
  if (faqEl) T.faq.forEach(function (f, i) {
    var item = document.createElement('div');
    item.className = 'faq-item' + (i === 0 ? ' open' : '');
    item.innerHTML =
      '<button class="faq-q" aria-expanded="' + (i === 0) + '">' + f[0] +
      '<svg class="cv" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 9l6 6 6-6"/></svg></button>' +
      '<div class="faq-a"><p>' + f[1] + '</p></div>';
    faqEl.appendChild(item);
    var a = item.querySelector('.faq-a');
    var q = item.querySelector('.faq-q');
    if (i === 0) a.style.maxHeight = a.scrollHeight + 40 + 'px';
    q.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      faqEl.querySelectorAll('.faq-item').forEach(function (it) {
        it.classList.remove('open');
        it.querySelector('.faq-a').style.maxHeight = '0px';
        it.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 40 + 'px';
        q.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ---------- Donate modal ---------- */
  var LADDER = T.ladder;
  var M = T.m;
  var state = { amount: 50 };
  var overlay = document.getElementById('donateModal');
  var body = document.getElementById('modalBody');
  var lastFocus = null;

  function val() { return state.amount; }
  function impactFor(a) {
    var x = LADDER.find(function (l) { return l.a === a; });
    return x ? x.im : '';
  }

  function renderForm() {
    body.innerHTML =
      '<button class="x" id="mx" aria-label="' + M.close + '">✕</button>' +
      '<div style="font-size:11px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:var(--accent)">' + M.eyebrow + '</div>' +
      '<h3>' + M.title + '</h3>' +
      '<div class="amts">' + LADDER.map(function (l) {
        var on = (state.amount === l.a);
        return '<button class="amt-opt' + (on ? ' on' : '') + '" data-amt="' + l.a + '">' +
          '<div class="av"><span class="v">₦' + l.a + '</span>' + (l.s ? '<span class="sug">' + M.suggested + '</span>' : '') + '</div>' +
          '<div class="im">' + l.im + '</div></button>';
      }).join('') + '</div>' +
      '<div class="reassure"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0E7C66" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l2.5 5 5.5.8-4 3.9 1 5.5L12 21l-5-2.3 1-5.5-4-3.9 5.5-.8z"/></svg>' +
        '<span><b>₦' + (val() || 0) + '</b> = ' + impactFor(state.amount) + '.</span></div>' +
      '<button class="btn btn-block" id="msubmit" style="margin-top:14px">' + fmt(M.donate, { amt: '₦' + (val() || 0) }) + ' <span class="arr">→</span></button>' +
      '<div class="secure">' + M.secure + '</div>';

    body.querySelector('#mx').onclick = close;
    body.querySelectorAll('[data-amt]').forEach(function (b) {
      b.onclick = function () { state.amount = Number(b.dataset.amt); renderForm(); };
    });
    body.querySelector('#msubmit').onclick = function () {
      var url = checkoutUrl(state.amount);
      if (!url) { renderThanks(); return; }
      // TikTok: signal donation intent before leaving for the Shopify checkout.
      // The purchase itself (CompletePayment) is tracked by the pixel on Shopify.
      var amt = Number(state.amount) || 0;
      var go = function () { window.location.href = url; };
      var fired = false;
      try {
        if (window.ttq && typeof window.ttq.track === 'function') {
          window.ttq.track('InitiateCheckout', {
            value: amt,
            currency: 'USD',
            contents: [{ content_id: 'donation-' + amt, content_type: 'product', content_name: 'Donation', quantity: 1, price: amt }]
          });
          fired = true;
        }
      } catch (e) {}
      // Give the pixel a moment to send the beacon, but never block for long.
      if (fired) setTimeout(go, 300); else go();
    };
    body.querySelector('#mx').focus();
  }

  function renderThanks() {
    var bodyHtml = fmt(M.thanksBody, {
      amt: '<b style="color:var(--ink)">₦' + val() + '</b>',
      impact: '<b style="color:var(--accent)">' + lowerFirst(impactFor(state.amount)) + '</b>'
    });
    body.innerHTML =
      '<div class="thanks">' +
        '<div class="ic"><svg width="34" height="34" viewBox="0 0 24 24" fill="#F5A623"><path d="M12 21s-7-4.35-9.5-8.5C.8 9.5 2.3 6 5.5 6 7.4 6 8.8 7 12 9.5 15.2 7 16.6 6 18.5 6 21.7 6 23.2 9.5 21.5 12.5 19 16.65 12 21 12 21z"/></svg></div>' +
        '<h3>' + M.thanksTitle + '</h3>' +
        '<p style="margin:0 0 20px;color:var(--body)">' + bodyHtml + '</p>' +
        '<button class="btn btn-block" id="mclose">' + M.back + '</button>' +
      '</div>';
    var btn = body.querySelector('#mclose');
    btn.onclick = close;
    btn.focus();
  }

  function open() {
    lastFocus = document.activeElement;
    renderForm();
    overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    overlay.classList.remove('show');
    document.body.style.overflow = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  if (overlay && body) {
    document.querySelectorAll('[data-donate]').forEach(function (b) {
      b.addEventListener('click', function (e) {
        e.preventDefault();
        // optional data-amt on the trigger pre-selects that amount in the modal
        var a = Number(b.getAttribute('data-amt'));
        if (a && LADDER.some(function (l) { return l.a === a; })) state.amount = a;
        open();
      });
    });
    overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('show')) close();
    });
  }

  /* ---------- Contact form (opens the visitor's email app) ---------- */
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = (document.getElementById('cf-name') || {}).value || '';
      var email = (document.getElementById('cf-email') || {}).value || '';
      var message = (document.getElementById('cf-msg') || {}).value || '';
      var subject = encodeURIComponent('Website message from ' + (name || 'a supporter'));
      var bodyText = message + '\n\nFrom: ' + name + (email ? ' (' + email + ')' : '');
      window.location.href = 'mailto:hello@handsforafrica.org?subject=' + subject + '&body=' + encodeURIComponent(bodyText);
      var note = document.getElementById('cf-note');
      if (note) { note.style.display = 'block'; }
    });
  }
})();
