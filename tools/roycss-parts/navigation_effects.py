"""
RoyCSS Effects: Navigation
CSS effect tuples for navigation UI patterns including menus, tabs, breadcrumbs,
pagination, steppers, progress dots, and dropdowns.
"""

navigation_effects = [
    # 1. Menu Slide - Menu items slide in from left
    (
        "Menu Slide",
        "rc-nav-menu-slide",
        "navigation",
        "box",
        """
.rc-nav-menu-slide {
    display: flex;
    flex-direction: column;
    gap: 2px;
    list-style: none;
    margin: 0;
    padding: 0;
}
.rc-nav-menu-slide li {
    opacity: 0;
    transform: translateX(-30px);
    animation: rcNavMenuSlide 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}
.rc-nav-menu-slide li:nth-child(1) { animation-delay: 0s; }
.rc-nav-menu-slide li:nth-child(2) { animation-delay: 0.06s; }
.rc-nav-menu-slide li:nth-child(3) { animation-delay: 0.12s; }
.rc-nav-menu-slide li:nth-child(4) { animation-delay: 0.18s; }
.rc-nav-menu-slide li:nth-child(5) { animation-delay: 0.24s; }
.rc-nav-menu-slide li:nth-child(6) { animation-delay: 0.30s; }
.rc-nav-menu-slide li:nth-child(7) { animation-delay: 0.36s; }
.rc-nav-menu-slide li:nth-child(8) { animation-delay: 0.42s; }
.rc-nav-menu-slide a {
    display: block;
    padding: 10px 20px;
    color: #e2e8f0;
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    border-radius: 8px;
    transition: background 0.2s ease, color 0.2s ease;
}
.rc-nav-menu-slide a:hover {
    background: rgba(124, 58, 237, 0.15);
    color: #a78bfa;
}
@keyframes rcNavMenuSlide {
    0% {
        opacity: 0;
        transform: translateX(-30px);
    }
    100% {
        opacity: 1;
        transform: translateX(0);
    }
}
""",
    ),

    # 2. Menu Fade Scale - Menu items fade in with scale
    (
        "Menu Fade Scale",
        "rc-nav-menu-fade-scale",
        "navigation",
        "box",
        """
.rc-nav-menu-fade-scale {
    display: flex;
    flex-direction: column;
    gap: 2px;
    list-style: none;
    margin: 0;
    padding: 0;
}
.rc-nav-menu-fade-scale li {
    opacity: 0;
    transform: scale(0.85);
    animation: rcNavMenuFadeScale 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}
.rc-nav-menu-fade-scale li:nth-child(1) { animation-delay: 0s; }
.rc-nav-menu-fade-scale li:nth-child(2) { animation-delay: 0.05s; }
.rc-nav-menu-fade-scale li:nth-child(3) { animation-delay: 0.10s; }
.rc-nav-menu-fade-scale li:nth-child(4) { animation-delay: 0.15s; }
.rc-nav-menu-fade-scale li:nth-child(5) { animation-delay: 0.20s; }
.rc-nav-menu-fade-scale li:nth-child(6) { animation-delay: 0.25s; }
.rc-nav-menu-fade-scale li:nth-child(7) { animation-delay: 0.30s; }
.rc-nav-menu-fade-scale li:nth-child(8) { animation-delay: 0.35s; }
.rc-nav-menu-fade-scale a {
    display: block;
    padding: 10px 20px;
    color: #e2e8f0;
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    border-radius: 8px;
    transition: background 0.2s ease, color 0.2s ease;
}
.rc-nav-menu-fade-scale a:hover {
    background: rgba(99, 102, 241, 0.15);
    color: #a78bfa;
}
@keyframes rcNavMenuFadeScale {
    0% {
        opacity: 0;
        transform: scale(0.85);
    }
    100% {
        opacity: 1;
        transform: scale(1);
    }
}
""",
    ),

    # 3. Menu Scale - Menu items scale up from 0
    (
        "Menu Scale",
        "rc-nav-menu-scale",
        "navigation",
        "box",
        """
.rc-nav-menu-scale {
    display: flex;
    flex-direction: column;
    gap: 4px;
    list-style: none;
    margin: 0;
    padding: 0;
}
.rc-nav-menu-scale li {
    opacity: 0;
    transform: scale(0);
    transform-origin: left center;
    animation: rcNavMenuScale 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}
.rc-nav-menu-scale li:nth-child(1) { animation-delay: 0s; }
.rc-nav-menu-scale li:nth-child(2) { animation-delay: 0.05s; }
.rc-nav-menu-scale li:nth-child(3) { animation-delay: 0.10s; }
.rc-nav-menu-scale li:nth-child(4) { animation-delay: 0.15s; }
.rc-nav-menu-scale li:nth-child(5) { animation-delay: 0.20s; }
.rc-nav-menu-scale li:nth-child(6) { animation-delay: 0.25s; }
.rc-nav-menu-scale li:nth-child(7) { animation-delay: 0.30s; }
.rc-nav-menu-scale li:nth-child(8) { animation-delay: 0.35s; }
.rc-nav-menu-scale a {
    display: block;
    padding: 10px 20px;
    color: #e2e8f0;
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    border-radius: 8px;
    transition: background 0.2s ease, color 0.2s ease;
}
.rc-nav-menu-scale a:hover {
    background: rgba(124, 58, 237, 0.15);
    color: #a78bfa;
}
@keyframes rcNavMenuScale {
    0% {
        opacity: 0;
        transform: scale(0);
    }
    100% {
        opacity: 1;
        transform: scale(1);
    }
}
""",
    ),

    # 4. Accordion Menu - Accordion expand/collapse animation (height animation)
    (
        "Accordion Menu",
        "rc-nav-accordion",
        "navigation",
        "box",
        """
.rc-nav-accordion {
    list-style: none;
    margin: 0;
    padding: 0;
}
.rc-nav-accordion > li {
    border-bottom: 1px solid rgba(124, 58, 237, 0.12);
}
.rc-nav-accordion > li:last-child {
    border-bottom: none;
}
.rc-nav-accordion .rc-nav-accordion-trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 12px 16px;
    border: none;
    background: transparent;
    color: #e2e8f0;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    text-align: left;
    transition: background 0.2s ease, color 0.2s ease;
}
.rc-nav-accordion .rc-nav-accordion-trigger:hover {
    background: rgba(124, 58, 237, 0.1);
    color: #a78bfa;
}
.rc-nav-accordion .rc-nav-accordion-icon {
    display: inline-block;
    width: 16px;
    height: 16px;
    transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    flex-shrink: 0;
    margin-left: 8px;
}
.rc-nav-accordion li.is-open > .rc-nav-accordion-trigger .rc-nav-accordion-icon {
    transform: rotate(180deg);
}
.rc-nav-accordion .rc-nav-accordion-panel {
    overflow: hidden;
    max-height: 0;
    opacity: 0;
    animation: rcNavAccordionCollapse 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}
.rc-nav-accordion li.is-open > .rc-nav-accordion-panel {
    max-height: 500px;
    opacity: 1;
    animation: rcNavAccordionExpand 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}
.rc-nav-accordion .rc-nav-accordion-panel a {
    display: block;
    padding: 8px 16px 8px 32px;
    color: #a78bfa;
    text-decoration: none;
    font-size: 13px;
    transition: background 0.2s ease, color 0.2s ease;
}
.rc-nav-accordion .rc-nav-accordion-panel a:hover {
    background: rgba(99, 102, 241, 0.1);
    color: #0ff;
}
@keyframes rcNavAccordionExpand {
    0% {
        max-height: 0;
        opacity: 0;
    }
    100% {
        max-height: 500px;
        opacity: 1;
    }
}
@keyframes rcNavAccordionCollapse {
    0% {
        max-height: 500px;
        opacity: 1;
    }
    100% {
        max-height: 0;
        opacity: 0;
    }
}
""",
    ),

    # 5. Tabs Underline - Active tab underline slides between items
    (
        "Tabs Underline",
        "rc-nav-tabs-underline",
        "navigation",
        "box",
        """
.rc-nav-tabs-underline {
    display: flex;
    position: relative;
    gap: 0;
    list-style: none;
    margin: 0;
    padding: 0;
    border-bottom: 1px solid rgba(124, 58, 237, 0.2);
}
.rc-nav-tabs-underline li {
    position: relative;
}
.rc-nav-tabs-underline a {
    display: block;
    padding: 10px 20px;
    color: #94a3b8;
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    white-space: nowrap;
    transition: color 0.25s ease;
}
.rc-nav-tabs-underline a:hover {
    color: #e2e8f0;
}
.rc-nav-tabs-underline li.is-active a {
    color: #a78bfa;
}
.rc-nav-tabs-underline li::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, #7c3aed, #6366f1);
    border-radius: 2px 2px 0 0;
    transform: scaleX(0);
    transform-origin: center;
    transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.rc-nav-tabs-underline li.is-active::after {
    transform: scaleX(1);
    animation: rcNavTabsUnderline 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}
@keyframes rcNavTabsUnderline {
    0% {
        transform: scaleX(0);
    }
    100% {
        transform: scaleX(1);
    }
}
""",
    ),

    # 6. Breadcrumb Path - Breadcrumb items animate in sequentially
    (
        "Breadcrumb Path",
        "rc-nav-breadcrumb",
        "navigation",
        "box",
        """
.rc-nav-breadcrumb {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0;
    list-style: none;
    margin: 0;
    padding: 0;
    font-size: 14px;
}
.rc-nav-breadcrumb li {
    opacity: 0;
    animation: rcNavBreadcrumb 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}
.rc-nav-breadcrumb li:nth-child(1) { animation-delay: 0s; }
.rc-nav-breadcrumb li:nth-child(2) { animation-delay: 0.08s; }
.rc-nav-breadcrumb li:nth-child(3) { animation-delay: 0.16s; }
.rc-nav-breadcrumb li:nth-child(4) { animation-delay: 0.24s; }
.rc-nav-breadcrumb li:nth-child(5) { animation-delay: 0.32s; }
.rc-nav-breadcrumb li + li::before {
    content: '';
    display: inline-block;
    width: 16px;
    height: 16px;
    margin: 0 8px;
    background: none;
    border-top: 2px solid #6366f1;
    border-right: 2px solid #6366f1;
    transform: rotate(45deg);
    opacity: 0.5;
    flex-shrink: 0;
}
.rc-nav-breadcrumb a {
    color: #a78bfa;
    text-decoration: none;
    transition: color 0.2s ease;
}
.rc-nav-breadcrumb a:hover {
    color: #0ff;
}
.rc-nav-breadcrumb li:last-child span {
    color: #e2e8f0;
    font-weight: 500;
}
@keyframes rcNavBreadcrumb {
    0% {
        opacity: 0;
        transform: translateX(-12px);
    }
    100% {
        opacity: 1;
        transform: translateX(0);
    }
}
""",
    ),

    # 7. Pagination Pulse - Active pagination button pulses
    (
        "Pagination Pulse",
        "rc-nav-pagination-pulse",
        "navigation",
        "box",
        """
.rc-nav-pagination-pulse {
    display: flex;
    align-items: center;
    gap: 6px;
    list-style: none;
    margin: 0;
    padding: 0;
}
.rc-nav-pagination-pulse a,
.rc-nav-pagination-pulse span {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 8px;
    color: #94a3b8;
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    transition: color 0.2s ease, background 0.2s ease;
}
.rc-nav-pagination-pulse a:hover {
    background: rgba(124, 58, 237, 0.15);
    color: #a78bfa;
}
.rc-nav-pagination-pulse li.is-active span {
    color: #fff;
    background: linear-gradient(135deg, #7c3aed, #6366f1);
    animation: rcNavPaginationPulse 2s ease-in-out infinite;
}
@keyframes rcNavPaginationPulse {
    0%, 100% {
        box-shadow: 0 0 0 0 rgba(124, 58, 237, 0.5);
    }
    50% {
        box-shadow: 0 0 0 6px rgba(124, 58, 237, 0);
    }
}
""",
    ),

    # 8. Stepper Progress - Step indicator with animated progress line
    (
        "Stepper Progress",
        "rc-nav-stepper",
        "navigation",
        "box",
        """
.rc-nav-stepper {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0;
    list-style: none;
    margin: 0;
    padding: 0;
    counter-reset: rcStepper;
}
.rc-nav-stepper li {
    display: flex;
    align-items: center;
    flex: 1;
    position: relative;
}
.rc-nav-stepper li::before {
    counter-increment: rcStepper;
    content: counter(rcStepper);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: rgba(124, 58, 237, 0.15);
    color: #94a3b8;
    font-size: 13px;
    font-weight: 600;
    flex-shrink: 0;
    z-index: 1;
    transition: background 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
}
.rc-nav-stepper li::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 16px;
    width: 100%;
    height: 2px;
    background: rgba(124, 58, 237, 0.15);
    transform: translateY(-50%);
    z-index: 0;
}
.rc-nav-stepper li:last-child::after {
    display: none;
}
.rc-nav-stepper li .rc-nav-stepper-label {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 8px;
    font-size: 12px;
    color: #94a3b8;
    white-space: nowrap;
    transition: color 0.3s ease;
}
.rc-nav-stepper li.is-completed::before {
    background: linear-gradient(135deg, #7c3aed, #6366f1);
    color: #fff;
}
.rc-nav-stepper li.is-completed::after {
    background: linear-gradient(90deg, #7c3aed, #6366f1);
    animation: rcNavStepperLine 0.5s ease forwards;
}
.rc-nav-stepper li.is-active::before {
    background: linear-gradient(135deg, #7c3aed, #6366f1);
    color: #fff;
    box-shadow: 0 0 0 4px rgba(124, 58, 237, 0.25);
    animation: rcNavStepperPulse 2s ease-in-out infinite;
}
.rc-nav-stepper li.is-active .rc-nav-stepper-label {
    color: #a78bfa;
    font-weight: 600;
}
.rc-nav-stepper li.is-completed + li::after {
    background: linear-gradient(90deg, #7c3aed, #6366f1);
}
@keyframes rcNavStepperLine {
    0% {
        transform: translateY(-50%) scaleX(0);
        transform-origin: left;
    }
    100% {
        transform: translateY(-50%) scaleX(1);
        transform-origin: left;
    }
}
@keyframes rcNavStepperPulse {
    0%, 100% {
        box-shadow: 0 0 0 4px rgba(124, 58, 237, 0.25);
    }
    50% {
        box-shadow: 0 0 0 8px rgba(124, 58, 237, 0.08);
    }
}
""",
    ),

    # 9. Progress Dots - Dot navigation with active state animation
    (
        "Progress Dots",
        "rc-nav-progress-dots",
        "navigation",
        "box",
        """
.rc-nav-progress-dots {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    list-style: none;
    margin: 0;
    padding: 0;
}
.rc-nav-progress-dots li {
    position: relative;
}
.rc-nav-progress-dots a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: rgba(124, 58, 237, 0.25);
    transition: background 0.3s ease, transform 0.3s ease;
    text-indent: -9999px;
    overflow: hidden;
}
.rc-nav-progress-dots a:hover {
    background: rgba(124, 58, 237, 0.5);
    transform: scale(1.3);
}
.rc-nav-progress-dots li.is-active a {
    background: #7c3aed;
    transform: scale(1.3);
    animation: rcNavProgressDots 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}
.rc-nav-progress-dots li.is-active::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: rgba(124, 58, 237, 0.4);
    transform: translate(-50%, -50%);
    animation: rcNavProgressDotsRing 2s ease-in-out infinite;
    pointer-events: none;
}
@keyframes rcNavProgressDots {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.6);
    }
    100% {
        transform: scale(1.3);
    }
}
@keyframes rcNavProgressDotsRing {
    0%, 100% {
        transform: translate(-50%, -50%) scale(1);
        opacity: 0.6;
    }
    50% {
        transform: translate(-50%, -50%) scale(2.5);
        opacity: 0;
    }
}
""",
    ),

    # 10. Dropdown Reveal - Dropdown menu reveal animation (scale + opacity from top)
    (
        "Dropdown Reveal",
        "rc-nav-dropdown",
        "navigation",
        "box",
        """
.rc-nav-dropdown {
    position: relative;
    display: inline-block;
}
.rc-nav-dropdown > a {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 10px 16px;
    color: #e2e8f0;
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    border-radius: 8px;
    transition: background 0.2s ease, color 0.2s ease;
}
.rc-nav-dropdown > a:hover {
    background: rgba(124, 58, 237, 0.15);
    color: #a78bfa;
}
.rc-nav-dropdown .rc-nav-dropdown-arrow {
    display: inline-block;
    width: 12px;
    height: 12px;
    transition: transform 0.3s ease;
}
.rc-nav-dropdown.is-open > a .rc-nav-dropdown-arrow {
    transform: rotate(180deg);
}
.rc-nav-dropdown .rc-nav-dropdown-menu {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    min-width: 200px;
    list-style: none;
    margin: 0;
    padding: 6px;
    background: #1e1b2e;
    border: 1px solid rgba(124, 58, 237, 0.2);
    border-radius: 12px;
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(124, 58, 237, 0.05);
    z-index: 100;
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0.8) translateY(-8px);
    pointer-events: none;
    transition: opacity 0.25s ease, transform 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.rc-nav-dropdown.is-open .rc-nav-dropdown-menu {
    opacity: 1;
    transform: scaleY(1) translateY(0);
    pointer-events: auto;
    animation: rcNavDropdown 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}
.rc-nav-dropdown .rc-nav-dropdown-menu a {
    display: block;
    padding: 9px 14px;
    color: #cbd5e1;
    text-decoration: none;
    font-size: 13px;
    border-radius: 8px;
    transition: background 0.15s ease, color 0.15s ease;
}
.rc-nav-dropdown .rc-nav-dropdown-menu a:hover {
    background: rgba(124, 58, 237, 0.15);
    color: #a78bfa;
}
.rc-nav-dropdown .rc-nav-dropdown-menu .rc-nav-dropdown-divider {
    height: 1px;
    margin: 4px 8px;
    background: rgba(124, 58, 237, 0.15);
}
@keyframes rcNavDropdown {
    0% {
        opacity: 0;
        transform: scaleY(0.8) translateY(-8px);
    }
    100% {
        opacity: 1;
        transform: scaleY(1) translateY(0);
    }
}
""",
    ),
]