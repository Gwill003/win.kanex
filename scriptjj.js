/* ===============================================
   IMPROVED WHATSAPP PRELANDER SCRIPT
   Conversion-Optimized Flow & Interactions
   =============================================== */

// ===== CONFIGURATION =====
const CONFIG = {
    // Offer redirect URL (replace with actual offer page)
    offerURL: 'https://your-offer-page.com',

    // Prize configuration
    basePrizeUSD: 500,      // Base prize amount in USD

    // Timing (in milliseconds)
    chatDelay: 1200,        // Delay between chat messages
    typingDelay: 800,       // Typing indicator duration
    autoScrollDelay: 300,   // Scroll animation delay

    // Countdown timers (in seconds)
    urgencyCountdown: 347,  // 5:47
    finalCountdown: 300,    // 5:00

    // Exit intent
    exitIntentEnabled: true,
    exitIntentDelay: 3000,  // Show after 3 seconds on page
};

// ===== BASE64 URL PARAMETER HANDLING =====
/**
 * Get and decode the 'out' URL parameter
 * The 'out' parameter should contain a Base64-encoded URL
 */
function getRedirectURL() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const encodedURL = urlParams.get('out');

        if (encodedURL) {
            // Decode Base64
            const decodedURL = atob(encodedURL);
            console.log('🔗 Decoded redirect URL from "out" parameter:', decodedURL);
            return decodedURL;
        }
    } catch (error) {
        console.error('❌ Failed to decode "out" parameter:', error);
    }

    // Fallback to default CONFIG.offerURL
    console.log('🔗 Using default redirect URL:', CONFIG.offerURL);
    return CONFIG.offerURL;
}

// Set the redirect URL from 'out' parameter or use default
CONFIG.offerURL = getRedirectURL();

// ===== LOCALIZATION SYSTEM =====
let localization = null;

// ===== STATE =====
let currentStep = 'hero';
let urgencyTimer = CONFIG.urgencyCountdown;
let finalTimer = CONFIG.finalCountdown;
let exitTimer = urgencyTimer - 60;
let urgencyInterval = null;
let finalInterval = null;
let exitIntentTriggered = false;
let mouseOutCount = 0;
let userCountry = 'US'; // Default country
let userCountryName = 'United States'; // Default country name

// ===== COUNTRY DETECTION & LOCALIZATION =====
// Country detection is now handled by LocalizationSystem

function getCountryName(countryCode) {
    const countries = {
        'US': 'United States',
        'GB': 'United Kingdom',
        'CA': 'Canada',
        'AU': 'Australia',
        'DE': 'Germany',
        'FR': 'France',
        'ES': 'Spain',
        'IT': 'Italy',
        'BR': 'Brazil',
        'MX': 'Mexico',
        'AR': 'Argentina',
        'CL': 'Chile',
        'CO': 'Colombia',
        'PE': 'Peru',
        'IN': 'India',
        'PK': 'Pakistan',
        'BD': 'Bangladesh',
        'JP': 'Japan',
        'CN': 'China',
        'KR': 'South Korea',
        'ID': 'Indonesia',
        'PH': 'Philippines',
        'VN': 'Vietnam',
        'TH': 'Thailand',
        'MY': 'Malaysia',
        'SG': 'Singapore',
        'NZ': 'New Zealand',
        'ZA': 'South Africa',
        'NG': 'Nigeria',
        'EG': 'Egypt',
        'KE': 'Kenya',
        'RU': 'Russia',
        'PL': 'Poland',
        'NL': 'Netherlands',
        'BE': 'Belgium',
        'SE': 'Sweden',
        'NO': 'Norway',
        'DK': 'Denmark',
        'FI': 'Finland',
        'CH': 'Switzerland',
        'AT': 'Austria',
        'PT': 'Portugal',
        'GR': 'Greece',
        'TR': 'Turkey',
        'SA': 'Saudi Arabia',
        'AE': 'United Arab Emirates',
        'IL': 'Israel',
    };

    return countries[countryCode] || countryCode;
}

function updateQuestion2Text() {
    const question2Element = document.querySelector('#msg5 .message-text');
    if (question2Element) {
        question2Element.innerHTML = `<strong>Question 2 of 2:</strong><br><br>Are you a resident of ${userCountryName}?`;
    }
}

function updatePrizeDisplay() {
    console.log('💰 updatePrizeDisplay called');
    console.log('   User country:', userCountry);
    console.log('   Localization:', localization ? '✓' : '✗');
    console.log('   Formatted amount:', localization ? localization.formattedAmount : 'null');

    if (!localization || !localization.formattedAmount) {
        console.error('❌ Localization not ready or formattedAmount missing - skipping prize update');
        return;
    }

    // Update all prize text elements
    const prizeText = localization.formattedAmount;
    const elements = document.querySelectorAll('#prizeValue, #finalPrize, #ctaPrize, #exitPrize, #msg1Prize');

    console.log('   Found', elements.length, 'prize elements to update with:', prizeText);

    elements.forEach(el => {
        if (el) {
            el.textContent = prizeText;
        }
    });

    // Update prize image to currency image
    const prizeImage = document.getElementById('prizeImage');
    if (prizeImage) {
        const currencyImagePath = `images/${userCountry}_currency.png`;
        console.log('Setting prize image to:', currencyImagePath);
        prizeImage.src = currencyImagePath;
        prizeImage.alt = `${prizeText} ${localization.currencyData.currencyCode}`;
        prizeImage.style.borderRadius = '16px';
        prizeImage.style.objectFit = 'contain';
        prizeImage.style.maxWidth = '200px';
        prizeImage.style.height = 'auto';

        // Fallback chain if currency image doesn't exist
        prizeImage.onerror = function() {
            console.log('Currency image not found for', userCountry, ', trying US fallback');
            this.src = 'images/US_currency.png';
            this.onerror = function() {
                console.log('US image also failed, using SVG fallback');
                const currencyCode = localization.currencyData.currencyCode;
                this.src = `data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='200' height='200' rx='20' fill='%23f0f0f0'/%3E%3Ctext x='100' y='85' text-anchor='middle' fill='%2300a884' font-size='48'%3E💵%3C/text%3E%3Ctext x='100' y='120' text-anchor='middle' fill='%23333' font-size='24' font-weight='bold' font-family='Arial'%3E${encodeURIComponent(prizeText)}%3C/text%3E%3Ctext x='100' y='145' text-anchor='middle' fill='%23666' font-size='14' font-family='Arial'%3E${currencyCode}%3C/text%3E%3C/svg%3E`;
                this.onerror = null;
            };
        };
    }

    console.log('✅ Prize display updated:', prizeText, 'for', userCountryName);
}

function updateHeaderFlag() {
    console.log('🚩 updateHeaderFlag called with country:', userCountry);
    const headerAvatar = document.querySelector('.header-avatar img');

    if (!headerAvatar) {
        console.error('❌ Header avatar image not found!');
        return;
    }

    if (!userCountry) {
        console.error('❌ userCountry is not set!');
        return;
    }

    // Use flagcdn.com which supports all 249 countries and territories
    const flagUrl = `https://flagcdn.com/w80/${userCountry.toLowerCase()}.png`;
    console.log('Setting flag URL to:', flagUrl);

    headerAvatar.src = flagUrl;
    headerAvatar.alt = `${userCountryName} Flag`;
    headerAvatar.style.objectFit = 'cover';
    headerAvatar.style.width = '40px';
    headerAvatar.style.height = '40px';

    // Fallback to emoji flag if CDN fails
    headerAvatar.onerror = function() {
        console.log('⚠️ Flag CDN failed, using emoji fallback for:', userCountry);
        const flag = getCountryFlagEmoji(userCountry);
        const flagSvg = `data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='20' cy='20' r='20' fill='%23f0f0f0'/%3E%3Ctext x='20' y='28' text-anchor='middle' font-size='24' font-family='Arial'%3E${flag}%3C/text%3E%3C/svg%3E`;
        this.src = flagSvg;
        this.onerror = null;
        console.log('✅ Flag fallback applied');
    };

    headerAvatar.onload = function() {
        console.log('✅ Flag loaded successfully');
    };
}

function getCountryFlagEmoji(countryCode) {
    // Convert country code to flag emoji as fallback
    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
}

function updateUIText() {
    console.log('📝 updateUIText called');
    console.log('   Localization:', localization ? '✓' : '✗');
    console.log('   Translations:', localization?.translations ? '✓' : '✗');
    console.log('   Current language:', localization?.currentLanguage);

    if (!localization || !localization.translations) {
        console.error('❌ Translations not loaded - skipping UI text update');
        return;
    }

    console.log('✅ Starting UI text update with language:', localization.currentLanguage);

    const t = localization.t.bind(localization);
    const amount = localization.formattedAmount;
    const country = userCountryName;

    console.log('   Amount:', amount);
    console.log('   Country:', country);

    try {
        // Hero Section
        const heroBadge = document.querySelector('.hero-badge');
        if (heroBadge) heroBadge.textContent = t('hero.badge');

        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) heroTitle.textContent = t('hero.title');

        const heroSubtitle = document.querySelector('.hero-subtitle');
        if (heroSubtitle) heroSubtitle.textContent = t('hero.subtitle');

        const proofLabels = document.querySelectorAll('.proof-label');
        if (proofLabels[0]) proofLabels[0].textContent = t('hero.socialProof.claimedLabel');
        if (proofLabels[1]) proofLabels[1].textContent = t('hero.socialProof.ratingLabel');

        const ctaButton = document.querySelector('.cta-button span:first-child');
        if (ctaButton) ctaButton.textContent = t('hero.ctaButton');

        // Header
        const headerName = document.querySelector('.header-name');
        if (headerName) headerName.textContent = t('header.name');

        const headerStatus = document.querySelector('.header-status');
        if (headerStatus) {
            headerStatus.innerHTML = `<span class="status-dot"></span> ${t('header.status')}`;
        }

        // Urgency Bar
        const urgencyText = document.querySelector('.urgency-text');
        if (urgencyText) {
            const timer = urgencyText.querySelector('#urgencyTimer');
            if (timer) {
                const timerValue = timer.textContent;
                urgencyText.innerHTML = `${t('urgency.text')} <strong id="urgencyTimer">${timerValue}</strong>`;
            }
        }

        // Time Bubble
        const timeBubble = document.querySelector('.time-bubble');
        if (timeBubble) {
            timeBubble.textContent = t('chat.timeBubble');
        }

        // Update all chat sender names
        const senders = document.querySelectorAll('.message-sender');
        senders.forEach(sender => {
            sender.textContent = t('chat.sender');
        });

        // Update all chat timestamps
        const timestamps = document.querySelectorAll('.message-time');
        timestamps.forEach(timestamp => {
            // Keep checkmarks, just update the "Now" text
            if (timestamp.textContent.includes('✓')) {
                timestamp.innerHTML = t('chat.timeStamp') + ' ✓';
            } else {
                timestamp.textContent = t('chat.timeStamp');
            }
        });

        // Chat Messages
        const msg1 = document.querySelector('#msg1 .message-text');
        if (msg1) {
            msg1.innerHTML = t('messages.greeting', { amount });
        }

        const msg2 = document.querySelector('#msg2 .message-text');
        if (msg2) {
            msg2.textContent = t('messages.intro');
        }

        const msg3 = document.querySelector('#msg3 .message-text');
        if (msg3) {
            msg3.innerHTML = `<strong>${t('messages.question1.label')}</strong><br><br>${t('messages.question1.text')}`;
        }

        // Update Q1 buttons
        const q1Buttons = document.querySelectorAll('#q1Buttons .quick-reply');
        if (q1Buttons[0]) q1Buttons[0].innerHTML = `✓ ${t('messages.question1.answerYes')}`;
        if (q1Buttons[1]) q1Buttons[1].innerHTML = `✗ ${t('messages.question1.answerNo')}`;

        const msg4 = document.querySelector('#msg4 .message-text');
        if (msg4) {
            msg4.textContent = t('messages.progress');
        }

        const msg5 = document.querySelector('#msg5 .message-text');
        if (msg5) {
            msg5.innerHTML = `<strong>${t('messages.question2.label')}</strong><br><br>${t('messages.question2.text', { country })}`;
        }

        // Update Q2 buttons
        const q2Buttons = document.querySelectorAll('#q2Buttons .quick-reply');
        if (q2Buttons[0]) q2Buttons[0].innerHTML = `✓ ${t('messages.question2.answerYes')}`;
        if (q2Buttons[1]) q2Buttons[1].innerHTML = `✗ ${t('messages.question2.answerNo')}`;

        const msg6 = document.querySelector('#msg6 .message-text');
        if (msg6) {
            msg6.textContent = t('messages.verifying');
        }

        const msg7Text = document.querySelector('#msg7 .message-text');
        if (msg7Text) {
            const successHtml = `<strong>${t('messages.success.title')}</strong><br><br>${t('messages.success.text')}<br><br>${t('messages.success.reservation', { amount, time: '<span id="finalTimer">5:00</span>' })}`;
            msg7Text.innerHTML = successHtml;
        }

        const msg8Text = document.querySelector('#msg8 .message-text');
        if (msg8Text) {
            const stepsHtml = `<strong>${t('messages.nextSteps.title')}</strong><br><br>
${t('messages.nextSteps.step1')}<br>
${t('messages.nextSteps.step2')}<br>
${t('messages.nextSteps.step3')}<br><br>
${t('messages.nextSteps.warning')}`;
            msg8Text.innerHTML = stepsHtml;
        }

        // Final CTA
        const ctaFinal = document.querySelector('.cta-button-final');
        if (ctaFinal) {
            ctaFinal.innerHTML = `${t('finalCta.icon')} ${t('finalCta.text', { amount })} ${t('finalCta.arrow')}`;
        }

        const secureBadge = document.querySelector('.cta-badge-secure');
        if (secureBadge) secureBadge.textContent = t('finalCta.badges.secure');

        const verifiedBadge = document.querySelector('.cta-badge-verified');
        if (verifiedBadge) verifiedBadge.textContent = t('finalCta.badges.verified');

        const instantBadge = document.querySelector('.cta-badge-instant');
        if (instantBadge) instantBadge.textContent = t('finalCta.badges.instant');

        // Exit Modal
        const exitIcon = document.querySelector('.exit-icon');
        if (exitIcon) exitIcon.textContent = t('exitModal.icon');

        const exitTitle = document.querySelector('.exit-title');
        if (exitTitle) exitTitle.textContent = t('exitModal.title');

        const exitMessage = document.querySelector('.exit-message');
        if (exitMessage) exitMessage.textContent = t('exitModal.message', { count: Math.floor(Math.random() * 50) + 20 });

        const exitAvailability = document.querySelector('.exit-availability');
        if (exitAvailability) exitAvailability.innerHTML = t('exitModal.availability', { amount, time: `<span id="exitTimer">${formatTime(exitTimer)}</span>` });

        const exitStayBtn = document.querySelector('.exit-stay-button');
        if (exitStayBtn) exitStayBtn.innerHTML = t('exitModal.stayButton');

        const exitLeaveBtn = document.querySelector('.exit-leave-button');
        if (exitLeaveBtn) exitLeaveBtn.textContent = t('exitModal.leaveButton');

        // Expired Modal
        const expiredIcon = document.querySelector('.expired-icon');
        if (expiredIcon) expiredIcon.textContent = t('expired.icon');

        const expiredTitle = document.querySelector('.expired-title');
        if (expiredTitle) expiredTitle.textContent = t('expired.title');

        const expiredMessage = document.querySelector('.expired-message');
        if (expiredMessage) expiredMessage.textContent = t('expired.message');

        const expiredBtn = document.querySelector('.expired-refresh-button');
        if (expiredBtn) expiredBtn.textContent = t('expired.button');

        // Progress Indicator Labels
        const progressLabels = document.querySelectorAll('.progress-label');
        if (progressLabels[0]) progressLabels[0].textContent = t('progress.qualified');
        if (progressLabels[1]) progressLabels[1].textContent = t('progress.verify');
        if (progressLabels[2]) progressLabels[2].textContent = t('progress.claim');

        console.log('✅ UI text updated with translations');
    } catch (error) {
        console.error('❌ Error updating UI text:', error);
    }
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', async function() {
    console.log('=== Page Initialization Started ===');

    try {
        // Initialize localization system
        console.log('Creating LocalizationSystem...');
        localization = new LocalizationSystem();

        console.log('Calling localization.init()...');
        const context = await localization.init();

        console.log('Context received:', context);

        // Set user country info
        userCountry = context.countryCode;
        userCountryName = getCountryName(context.countryCode);

        console.log('User country set to:', userCountry, userCountryName);

        // Update UI with localized data
        console.log('Updating UI components...');
        updateUIText();        // Update all text with translations
        updateHeaderFlag();    // Update flag icon
        updatePrizeDisplay();  // Update prize amounts and currency image

        // Initialize other components
        console.log('Initializing other components...');
        initializeCountdowns();
        initializeExitIntent();
        animateClaimedCounter();
        preventDefaultBehaviors();

        console.log('=== Page Initialization Complete ===');
    } catch (error) {
        console.error('❌ Error during initialization:', error);
    }
});

// ===== COUNTDOWN TIMERS =====
function initializeCountdowns() {
    // Urgency bar countdown
    urgencyInterval = setInterval(() => {
        urgencyTimer--;
        updateTimerDisplay('urgencyTimer', urgencyTimer);
        updateTimerDisplay('exitTimer', exitTimer);

        if (urgencyTimer <= 0) {
            clearInterval(urgencyInterval);
            showExpiredState();
        }
    }, 1000);
}

function startFinalCountdown() {
    finalInterval = setInterval(() => {
        finalTimer--;
        updateTimerDisplay('finalTimer', finalTimer);

        if (finalTimer <= 0) {
            clearInterval(finalInterval);
        }
    }, 1000);
}

function updateTimerDisplay(elementId, seconds) {
    const el = document.getElementById(elementId);
    if (!el) return;

    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    el.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

    // Add urgency styling when time is low
    if (seconds <= 60 && elementId === 'urgencyTimer') {
        el.parentElement.style.animation = 'flash 0.5s infinite';
    }
}

// ===== MAIN FLOW =====
function startChat() {
    currentStep = 'chat';

    // Hide hero, show chat
    document.getElementById('prizeHero').style.display = 'none';
    document.getElementById('messagesWrapper').style.display = 'block';
    document.getElementById('progressBar').style.display = 'flex';

    // Scroll to top smoothly
    document.getElementById('chatContainer').scrollTop = 0;

    // Show messages sequentially
    showMessageSequence();
}

async function showMessageSequence() {
    await showMessage('msg1', CONFIG.chatDelay);
    await showMessage('msg2', CONFIG.chatDelay);
    await showMessage('msg3', CONFIG.chatDelay);

    // Enable first question buttons
    document.getElementById('q1Buttons').style.display = 'flex';
}

function showMessage(messageId, delay = 0) {
    return new Promise(resolve => {
        setTimeout(() => {
            const msg = document.getElementById(messageId);
            if (msg) {
                msg.style.display = 'block';
                scrollToBottom();
            }
            resolve();
        }, delay);
    });
}

function scrollToBottom() {
    setTimeout(() => {
        const container = document.getElementById('chatContainer');
        container.scrollTop = container.scrollHeight;
    }, CONFIG.autoScrollDelay);
}

// ===== QUESTION ANSWERS =====
async function answerQuestion(questionNum, answer) {
    if (questionNum === 1) {
        // Hide buttons
        document.getElementById('q1Buttons').style.display = 'none';

        // Update answer text based on user's selection using translations
        const answer1Text = document.querySelector('#answer1 .message-text');
        if (answer1Text && localization && localization.translations) {
            const key = answer === 'yes' ? 'messages.question1.answerYes' : 'messages.question1.answerNo';
            answer1Text.textContent = localization.t(key);
        } else {
            // Fallback if translations not loaded
            answer1Text.textContent = answer.charAt(0).toUpperCase() + answer.slice(1);
        }

        // Show user answer
        await showMessage('answer1', 300);

        // Update progress
        updateProgress(2);

        // Show next messages
        await showMessage('msg4', CONFIG.chatDelay);
        await showMessage('msg5', CONFIG.chatDelay);

        // Enable second question buttons
        document.getElementById('q2Buttons').style.display = 'flex';

    } else if (questionNum === 2) {
        // Hide buttons
        document.getElementById('q2Buttons').style.display = 'none';

        // Update answer text based on user's selection using translations
        const answer2Text = document.querySelector('#answer2 .message-text');
        if (answer2Text && localization && localization.translations) {
            const key = answer === 'yes' ? 'messages.question2.answerYes' : 'messages.question2.answerNo';
            answer2Text.textContent = localization.t(key);
        } else {
            // Fallback if translations not loaded
            answer2Text.textContent = answer.charAt(0).toUpperCase() + answer.slice(1);
        }

        // Show user answer
        await showMessage('answer2', 300);

        // Update progress
        updateProgress(3);

        // Show verification
        await showMessage('msg6', CONFIG.chatDelay);

        // Simulate verification delay
        await new Promise(resolve => setTimeout(resolve, 2500));

        // Show success
        await showMessage('msg7', 500);

        // Start final countdown
        startFinalCountdown();

        // Show next steps
        await showMessage('msg8', CONFIG.chatDelay);

        // Show final CTA
        setTimeout(() => {
            document.getElementById('finalCTA').style.display = 'block';
            scrollToBottom();
        }, 1000);
    }
}

function updateProgress(step) {
    const steps = document.querySelectorAll('.progress-step');
    steps.forEach((stepEl, index) => {
        if (index < step - 1) {
            stepEl.classList.add('completed');
            stepEl.classList.remove('active');
        } else if (index === step - 1) {
            stepEl.classList.add('active');
            stepEl.classList.remove('completed');
        }
    });
}

// ===== CTA REDIRECT =====
function redirectToOffer() {
    // Add click tracking here if needed
    console.log('Redirecting to offer:', CONFIG.offerURL);

    // Show loading state
    const btn = document.querySelector('.cta-button-final');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<span>🔄 Redirecting...</span>';
    btn.disabled = true;

    // Redirect after short delay (feels more natural)
    setTimeout(() => {
        window.location.href = CONFIG.offerURL;
    }, 800);
}

// ===== EXIT INTENT =====
function initializeExitIntent() {
    if (!CONFIG.exitIntentEnabled) return;

    let exitIntentActive = false;

    // Wait before enabling exit intent
    setTimeout(() => {
        exitIntentActive = true;
    }, CONFIG.exitIntentDelay);

    // Desktop: Mouse leaves viewport
    document.addEventListener('mouseout', function(e) {
        if (!exitIntentActive || exitIntentTriggered) return;

        if (e.clientY <= 0 || e.clientX <= 0 ||
            e.clientX >= window.innerWidth || e.clientY >= window.innerHeight) {
            mouseOutCount++;

            if (mouseOutCount >= 2) {
                showExitModal();
            }
        }
    });

    // Mobile: Back button detection (simplified)
    window.addEventListener('popstate', function() {
        if (exitIntentActive && !exitIntentTriggered) {
            history.pushState(null, '', location.href);
            showExitModal();
        }
    });

    // Add initial history state for mobile back detection
    history.pushState(null, '', location.href);
}

function showExitModal() {
    exitIntentTriggered = true;
    document.getElementById('exitModal').style.display = 'flex';
}

function closeExitModal() {
    document.getElementById('exitModal').style.display = 'none';

    // If on hero, start chat
    if (currentStep === 'hero') {
        startChat();
    }
}

function actuallyLeave() {
    // Log abandonment if needed
    console.log('User chose to leave');

    // You can redirect to a different page or just close modal
    window.close();
}

// ===== SOCIAL PROOF ANIMATION =====
function animateClaimedCounter() {
    const counterEl = document.getElementById('claimedToday');
    if (!counterEl) return;

    let currentCount = 2847;
    const targetCount = currentCount + Math.floor(Math.random() * 15) + 5;

    const interval = setInterval(() => {
        currentCount++;
        counterEl.textContent = currentCount.toLocaleString();

        if (currentCount >= targetCount) {
            clearInterval(interval);
        }
    }, 3000 + Math.random() * 2000); // Random interval between 3-5 seconds
}

// ===== EXPIRED STATE =====
function showExpiredState() {
    // Show expired overlay
    const container = document.querySelector('.container');

    const expiredOverlay = document.createElement('div');
    expiredOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.9);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
    `;

    expiredOverlay.innerHTML = `
        <div style="
            background: white;
            padding: 40px 30px;
            border-radius: 16px;
            text-align: center;
            max-width: 400px;
        ">
            <div style="font-size: 64px; margin-bottom: 20px;">⏰</div>
            <h2 style="font-size: 24px; color: #dc2626; margin-bottom: 12px;">Time's Up!</h2>
            <p style="font-size: 16px; color: #667781; margin-bottom: 24px;">
                Your reservation has expired.<br>
                Please refresh to try again.
            </p>
            <button onclick="location.reload()" style="
                padding: 14px 32px;
                background: linear-gradient(135deg, #00a884 0%, #008069 100%);
                color: white;
                border: none;
                border-radius: 50px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
            ">
                Refresh Page
            </button>
        </div>
    `;

    document.body.appendChild(expiredOverlay);
}

// ===== PREVENT DEFAULT BEHAVIORS =====
function preventDefaultBehaviors() {
    // Prevent pull-to-refresh on mobile
    document.body.addEventListener('touchmove', function(e) {
        if (e.target.closest('.chat-container')) return;
        e.preventDefault();
    }, { passive: false });

    // Prevent double-tap zoom
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(e) {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            e.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
}

// ===== UTILITY FUNCTIONS =====
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// ===== TRACKING HELPERS =====
function trackEvent(eventName, eventData = {}) {
    // Integrate with your tracking system (GA, FB Pixel, etc.)
    console.log('Track Event:', eventName, eventData);

    // Example: Facebook Pixel
    if (typeof fbq !== 'undefined') {
        fbq('trackCustom', eventName, eventData);
    }

    // Example: Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }
}

// Track page load
trackEvent('PageView', { page: 'prelander' });

// Track when users start chat
const originalStartChat = startChat;
startChat = function() {
    trackEvent('ChatStarted', {
        prize: localization ? localization.formattedAmount : '$500',
        country: userCountry,
        currency: localization ? localization.currencyData.currencyCode : 'USD'
    });
    originalStartChat();
};

// Track answers
const originalAnswerQuestion = answerQuestion;
answerQuestion = function(questionNum, answer) {
    trackEvent('QuestionAnswered', {
        question: questionNum,
        answer: answer
    });
    originalAnswerQuestion(questionNum, answer);
};

// Track CTA clicks
const originalRedirect = redirectToOffer;
redirectToOffer = function() {
    trackEvent('CTAClicked', {
        prize: localization ? localization.formattedAmount : '$500',
        country: userCountry,
        currency: localization ? localization.currencyData.currencyCode : 'USD',
        timeRemaining: finalTimer
    });
    originalRedirect();
};

// ===== A/B TESTING HELPERS =====
function getABVariant() {
    // Simple 50/50 split
    return Math.random() < 0.5 ? 'A' : 'B';
}

// Store variant in session
if (!sessionStorage.getItem('ab_variant')) {
    sessionStorage.setItem('ab_variant', getABVariant());
}

const variant = sessionStorage.getItem('ab_variant');
console.log('A/B Variant:', variant);

// Example: Different prize amounts for variants
if (variant === 'B') {
    // Customize for variant B
    // CONFIG.basePrizeUSD = 750; // Test higher amount
}

// ===== DYNAMIC PRIZE CUSTOMIZATION =====
// Note: Prize is now automatically set based on country detection
// The base prize amount can be adjusted in CONFIG.basePrizeUSD

// ===== PERFORMANCE MONITORING =====
window.addEventListener('load', function() {
    if (window.performance) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page Load Time:', pageLoadTime + 'ms');

        // Track slow loads
        if (pageLoadTime > 3000) {
            trackEvent('SlowPageLoad', { loadTime: pageLoadTime });
        }
    }
});

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.message);
    trackEvent('JavaScriptError', {
        message: e.message,
        source: e.filename,
        line: e.lineno
    });
});

// ===== DEBUG MODE =====
if (window.location.search.includes('debug=1')) {
    console.log('=== DEBUG MODE ENABLED ===');
    console.log('Config:', CONFIG);

    // Add debug panel
    const debugPanel = document.createElement('div');
    debugPanel.style.cssText = `
        position: fixed;
        bottom: 10px;
        right: 10px;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 10px;
        border-radius: 8px;
        font-size: 11px;
        z-index: 99999;
        max-width: 200px;
    `;
    debugPanel.innerHTML = `
        <strong>Debug Panel</strong><br>
        Step: <span id="debugStep">${currentStep}</span><br>
        Variant: ${variant}<br>
        Country: ${userCountry}<br>
        Currency: ${localization ? localization.currencyData.currencyCode : 'USD'}<br>
        Prize: ${localization ? localization.formattedAmount : '$500'}<br>
        <button onclick="startChat()" style="margin-top:5px; padding:5px;">Skip to Chat</button>
    `;
    document.body.appendChild(debugPanel);

    // Update debug step
    const originalStartChat2 = startChat;
    startChat = function() {
        currentStep = 'chat';
        document.getElementById('debugStep').textContent = currentStep;
        originalStartChat2();
    };
}

console.log('✅ Improved Prelander Script Loaded');
