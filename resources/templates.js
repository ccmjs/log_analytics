/**
 * @overview HTML templates of ccmjs-based web component for log analytics
 * @author André Kless <andre.kless@web.de> (https://github.com/akless) 2023 */

/**
 * returns the main HTML template
 * @returns {string} main HTML template
 */
export const main = `
  <div id="refresh" title="Refresh" onclick="%onRefresh%">↻</div>
  <nav>
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <span class="nav-link active" id="events" onclick="%onEventClicks%">Clicks per Event</span>
      </li>
      <li class="nav-item">
        <span class="nav-link" id="times" onclick="%onOverTime%">Over time</span>
      </li>
    </ul>
  </nav>
  <main></main>
`;
