'use strict';

/**
 * @overview ccmjs-based web component for log analytics
 * @author André Kless <andre.kless@web.de> (https://github.com/akless) 2023
 * @license The MIT License (MIT)
 * @version 1.0.0
 * @domain https://ccmjs.github.io/log_analytics/
 */

( () => {
  const component = {
    name: 'log_analytics',
    ccm: '././libs/ccm/ccm.js',
    config: {
      "chart": [ "ccm.component", "././libs/highchart/ccm.highchart.js" ],
      "css": [ "ccm.load",
        [  // serial
          "././libs/bootstrap-5/css/bootstrap.css",
          "././resources/styles.css"
        ]
      ],
      "data": {
        "store": [ "ccm.store" ],
        "key": {}
      },
      "helper": [ "ccm.load", { "url": "././libs/ccm/helper.js", "type": "module" } ],
      "html": [ "ccm.load", { "url": "././resources/templates.js", "type": "module" } ],
      "onchange": console.log,
      "onstart": console.log,
      // "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/ccm.user.js", { "logged_in": true } ],
    },
    Instance: function () {

      let $, data;

      this.ready = async () => {

        // set shortcut to help functions
        $ = Object.assign( {}, this.ccm.helper, this.helper ); $.use( this.ccm );

      };

      this.start = async () => {

        // Load logged data.
        data = await $.dataset( this.data );

        // Render main HTML structure.
        $.setContent( this.element, $.html( this.html.main, this.events ) );

        // Trigger 'onstart' callback.
        this.onstart && await this.onstart( { app: this } );

      };

      /**
       * Returns the logged data.
       * @returns {Object}
       */
      this.getValue = () => data;

      /**
       * Event handlers
       * @type {Object.<string,Function>}
       */
      this.events = {

        /**
         * When refresh button is clicked.
         */
        onRefresh: async () => {
          this.onchange && this.onchange( { app: this, event: 'refresh', moment: 'before' } );
          $.setContent( this.element.querySelector( '#refresh' ), $.loading( this ) );
          this.onchange && this.onchange( { app: this, event: 'refresh', moment: 'loading' } );
          await this.start();
          this.onchange && this.onchange( { app: this, event: 'refresh', moment: 'after' } );
        },

        /**
         * If the number of logged events should be rendered.
         */
        onEventClicks: async event => {
          this.element.querySelectorAll( '.nav-link' ).forEach( item => item.classList.remove( 'active' ) );
          event.target.classList.add( 'active' );
          await renderEventClicks();
          this.onchange && this.onchange( { app: this, event: 'clicks' } );
        },

        /**
         * If the times of the logged events should be rendered.
         */
        onOverTime: async event => {
          this.element.querySelectorAll( '.nav-link' ).forEach( item => item.classList.remove( 'active' ) );
          event.target.classList.add( 'active' );
          await renderOverTime();
          this.onchange && this.onchange( { app: this, event: 'times' } );
        }

      };

      /**
       * Renders a chart showing which events were logged and how often.
       */
      const renderEventClicks = () => {
        // ...
      };

      /**
       * Renders a chart showing when which events were logged.
       */
      const renderOverTime = () => {
        // ...
      };

    }
  };
  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();