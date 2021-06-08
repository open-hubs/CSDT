import Base from './base';

//manages connections as a parent site
export class CSDTParent extends Base {
  constructor(iframe) {
    super();

    this.iframe = iframe;

    //ydoc send updates
    this.ydoc.on('update', (update, _origin, _doc, _tr) => {
      const event = new CustomEvent('CSDT-y-update', { detail: update });
      this.iframe.contentDocument.dispatchEvent(event);
    });
  }

  //returns a promise that resolves if the child site supports CSDT
  //resolves with the child CSDT version number
  checkSupport() {
    return new Promise((resolve, _reject) => {
      window.document.addEventListener('CSDT-response-check-support', (e) => resolve(e.detail), { once: true });

      const event = new CustomEvent('CSDT-check-support');
      this.iframe.contentDocument.dispatchEvent(event);
    });
  }

  //returns a promise that resolves with data from the child site
  openPortal(recievesThree = false, sendsThree = false) {
    return new Promise((resolve, _reject) => {
      window.document.addEventListener('CSDT-response-portal-open', (e) => resolve(e.detail), { once: true });

      const data = {
        recievesThree: recievesThree,
        sendsThree: sendsThree,
      };
      const event = new CustomEvent('CSDT-portal-open', { detail: data });
      this.iframe.contentDocument.dispatchEvent(event);
    });
  }
}
