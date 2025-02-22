import { Injectable } from '@angular/core';

interface DomainPhone {
  domain: string;
  phone: string;
}

@Injectable({
  providedIn: 'root',
})
export class PhoneDirectoryService {
  private dictionary: DomainPhone[] = [
      { domain: 'newagent.bandera123.com', phone: '1-855-219-2219' },
      { domain: 'newagent.wager4action.com', phone: '1-855-219-2224' },
      { domain: 'newagent.bigbenbets.com', phone: '1-855-219-2225' },
      { domain: 'newagent.gr1sports.com', phone: '1-855-219-2232' },
      { domain: 'newagent.betthewest.com', phone: '1-855-219-5813' },
      { domain: 'newagent.5starwagerz.com', phone: '1-855-219-5813' },
      { domain: 'newagent.sportsfanwagers.com', phone: '1-855-219-5815' },
      { domain: 'newagent.ablebet.com', phone: '1-855-219-5818' },
      { domain: 'newagent.betlonestar.com', phone: '1-855-219-5820' },
      { domain: 'newagent.mybettorsway.com', phone: '1-855-219-8315' },
      { domain: 'newagent.mywagerlive.com', phone: '1-855-219-8327' },
      { domain: 'newagent.betnola.com', phone: '1-855-219-8328' },
      { domain: 'newagent.betwebsports.com', phone: '1-855-219-8333' },
      { domain: 'newagent.primetimesportsbetting.com', phone: '1-855-219-8392' },
      { domain: 'newagent.easywinsports.com', phone: '1-855-248-0132' },
      { domain: 'newagent.newbreed365.com', phone: '1-855-248-0132' },
      { domain: 'newagent.kowagers.com', phone: '1-855-248-0126' },
      { domain: 'newagent.localhost', phone: '1-855-219-5815' },
  ];

  constructor() {}

  getPhoneByDomain(): string {
    const domain: string = window.location.hostname.replace('www.', '');
    const domainParts: string[] = domain.split('.');
    const siteName: string = domainParts.length > 2 ? domainParts[domainParts.length - 2] : domainParts[0];
    // const entry = this.dictionary.find(item => item.domain === domain);
    const entry = this.dictionary.find(item => item.domain.includes(siteName));
    return entry ? entry.phone : "";
  }
}
