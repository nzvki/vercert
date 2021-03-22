import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace verifier.certificates.biznet{
   export class Certificate extends Asset {
      certId: string;
      studentId: string;
      studentName: string;
      certTitle: string;
      certAward: string;
      certWording: string;
      issuer: Certifier;
   }
   export class Certifier extends Participant {
      CertifierNo: string;
      CertifierName: string;
   }
   export class VerifyCert extends Transaction {
      Cert: Certificate;
   }
   export class generateCert extends Event {
      Cert: Certificate;
   }
   export class generateQR extends Event {
      Cert: Certificate;
   }
// }
