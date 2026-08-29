/**
 * Runs in <head>, before the first paint, and decides whether this visit
 * animates at all.
 *
 * It cannot be a React effect. Effects run after hydration, so the browser
 * would paint the server HTML fully visible, hydration would hide every reveal
 * target, and the page would animate content that the visitor had already seen
 * — a flash of appearing, vanishing, and re-appearing content on any connection
 * slow enough to separate paint from hydration.
 *
 * Everything downstream keys off the class this sets, so failing to set it is
 * always the safe outcome: no class means no hiding and no animation.
 */
export const MOTION_READY_SCRIPT = `(function () {
  try {
    if (typeof IntersectionObserver === 'undefined') return
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    document.documentElement.classList.add('motion-ready')
  } catch (error) {
    /* An unreadable preference is not a reason to hide the page. */
  }
})()`
