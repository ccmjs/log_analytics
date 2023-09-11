/**
 * @overview ccmjs-based web component for a "Highchart.js" chart
 * @author André Kless <andre.kless@web.de> 2017-2019, 2021-2022
 * @copyright Copyright (c) 2017-2019, 2021-2022 André Kless
 * @license
 * Creative Commons Attribution-NonCommercial 3.0: https://creativecommons.org/licenses/by-nc/3.0/
 * Only for not-for-profit educational use.
 *
 * This ccmjs-based web component uses „Highcharts JS“: https://www.highcharts.com
 * Make sure that you have a valid license of „Highcharts JS“ before using this ccmjs-based web component.
 *
 * The developer André Kless of this component has a valid license of „Highcharts JS“ for not-for-profit educational use for the following product(s): Highcharts, Highstock, Highmaps
 * @version latest (4.0.0)
 */

( () => {
  const component = {
    name: 'highchart',
    ccm: '././libs/ccm/ccm.js',
    config: {
      "helper": [ "ccm.load", { "url": "././libs/ccm/helper.js", "type": "module" } ],
      "html": { "id": "chart", "style": "%%" },
      "libs": [
        "././libs/highcharts-10/highcharts.min.js"
      ],
      "settings": {},
      "style": "min-width: 400px; max-width: 800px; min-height: 400px; max-height: 800px; margin: 0 auto",
      "shadow": "none"
    },
    Instance: function () {

      /**
       * shortcut to help functions
       * @type {Object.<string,Function>}
       */
      let $;

      /**
       * when all dependencies are solved after creation and before the app starts
       * @returns {Promise<void>}
       */
      this.ready = async () => {

        // set shortcut to help functions
        $ = Object.assign( {}, this.ccm.helper, this.helper ); $.use( this.ccm );

        // make sure that "Highchart.js" library is executed only once
        if ( !window.highchart ) window.highchart = {};
        const getName = src => src.split( '/' ).pop().split( '.' )[ 0 ];
        for ( let i = 0; i < this.libs.length; i++ ) {
          const name = getName( this.libs[ i ] );
          if ( !window.highchart[ name ] ) {
            if ( name === 'highcharts' && window.highchart[ 'highcharts-gantt' ] ) {
              await $.sleep( 3000 );
              continue;
            }
            else if ( name === 'highcharts-gantt' && window.highchart[ 'highcharts' ] ) {
              await $.sleep( 3000 );
              window.Highcharts = null;
              window.highchart = {};
            }
            window.highchart[ name ] = this.ccm.load( this.libs[ i ] );
          }
          await window.highchart[ name ];
        }

        // get settings via function
        if ( typeof this.settings === 'function' ) this.settings = this.settings();

        // logging of 'ready' event
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );

      };

      /**
       * starts the app
       * @returns {Promise<void>}
       */
      this.start = async () => {

        // logging of 'start' event
        this.logger && this.logger.log( 'start' );

        // render main HTML structure
        $.setContent( this.element, $.html( this.html, this.style ) );

        // render chart
        this.chart = window.Highcharts[ this.libs[ 0 ].includes( 'gantt' ) ? 'ganttChart' : 'chart' ]( this.element.querySelector( '#chart' ), this.settings );

        // resize chart
        await $.sleep( 1 );
        this.chart.redraw();

      };

    }
  };
  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();