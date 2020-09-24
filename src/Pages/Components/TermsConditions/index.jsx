import React, { Fragment, Component } from "react";
import { translate } from "react-multi-lang";
import { connect } from "react-redux";
import compose from "compose-function";
import { withRouter } from "react-router-dom";
import { Button, Row, Col, Label, Card, CardBody, Container } from "reactstrap";

class TermsCondition extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Fragment>
        <Container>
          <Row>
            <Col md={12}>
              <Card style={{ marginTop: "75px" }}>
                <CardBody>
                  <h1>CONDITIONS GENERALES D’UTILISATION ONCF2255.ma</h1>
                  <br />
                  {/* first section */}
                  <section>
                    <h5>I - Article 1 – Champ d’application</h5>
                    <p>
                      Les dispositions du présent règlement sont applicables au
                      service de réclamation en ligne mis par l’ONCF à la
                      disposition de ses voyageurs sur le site web :
                      www.oncf2255.ma Les présentes conditions règlent toutes
                      les étapes nécessaires à la création et au suivi d’une
                      réclamation/suggestion. L’ONCF se réserve à tout moment de
                      modifier ses conditions d’utilisations. L’utilisateur est
                      invité à lire attentivement et de comprendre ces
                      conditions générales avant d’utiliser ce service. Il est
                      recommandé à l’utilisateur de les télécharger et /ou de
                      les imprimer et d’en conserver une copie. Il est également
                      conseillé à l’utilisateur de lire les présentes conditions
                      générales à chaque visite du site.
                    </p>
                    <br />
                    <h5>II - Conditions d'utilisation du Site ONCF2255.ma</h5>
                    <p>
                      Pour utiliser le site internet, Vous devez être âgé d'au
                      moins 18 ans, être capable juridiquement de contracter et
                      utiliser ce Site conformément aux présentes Conditions
                      Générales. Vous êtes responsable financièrement de
                      l'utilisation du Site faite tant en votre nom que pour le
                      compte de tiers, y compris des mineurs, sauf à démontrer
                      une utilisation frauduleuse ne résultant d'aucune faute ni
                      négligence de votre part. Vous garantissez la véracité et
                      l'exactitude des informations fournies par Vous-même ou
                      tout autre tiers utilisant vos données sur ce Site. Une
                      utilisation du service de réservation de ce Site,
                      frauduleuse ou qui contreviendrait aux présentes
                      Conditions Générales, pourra entraîner le refus par
                      l’ONCF, à tout moment, de Vous permettre d'accéder aux
                      Prestations proposées sur le dit Site.
                    </p>
                  </section>
                  {/* Section 2 */}
                  <section>
                    <h5>2.1 Création de réclamation</h5>
                    <p>
                      Pour créer une réclamation sur le site ONCF2255.ma,
                      l’utilisateur doit impérativement être client ONCF et
                      avoir acheté un billet de train et consommé son voyage. Il
                      sera nécessaire de compléter chacune des étapes établies
                      sur le site et la création ne sera considérée comme
                      terminée qu'une fois message validé. La procédure de
                      création de réclamation comporte les étapes suivantes : •
                      Donnés clients Elle concerne toutes les informations que
                      l’utilisateur ONCF devra renseigner afin de s’identifier
                      pour la 1ère fois à la plateforme de l’e-réclamation et
                      qui permettra à l’ONCF de l’identifier afin de répondre à
                      sa réclamation. Tous les champs sont obligatoires. A
                      défaut du remplissage d’un champ, l’utilisateur ne pourra
                      pas accéder à la phase suivante de son process de
                      réclamation en ligne. • Données voyage Cette étape
                      consiste pour l’utilisateur à prouver que son voyage a
                      bien eu lieu en communiquant les détails le concernant :
                      date de voyage/ n° de train/ gare départ et gare
                      d’arrivée/ticket de voyage. L’utilisateur doit
                      impérativement joindre une photo de son ticket de voyage.
                      Tous les champs sont obligatoires. Une fois validé,
                      l’utilisateur peut soit cliquer sur suivant pour
                      poursuivre le processus de réclamation ou bien retourner
                      en arrière pour corriger une information liée au
                      formulaire d’identification. • Choix de catégorie et sous
                      catégories A l’issu de cette étape l’utilisateur aura
                      achevé la phase d’identification voyage et pourra alors
                      soumettre sa réclamation en choisissant la catégorie et
                      sous-catégorie de sa réclamation qui sont présentées dans
                      le site. • Redaction de la reclamation Une fois les
                      catégories et sous catégories sélectionnées l’utilisateur
                      pourra rédiger un message détaillé sur un champ dédié et
                      peut aussi joindre un fichier conformément à la taille et
                      le format autorisé par le site. • Validation et envoi de
                      la Reclamation L’utilisateur perçoit par e-mail le détail
                      de sa réclamation qu’il pourra imprimer en format pdf. Le
                      récapitulatif lui sera envoyé instantanément sur sa boite
                      de messagerie électronique renseigné par ses soins. Dans
                      l'hypothèse où l’utilisateur ne reçoit pas ce mail, il lui
                      incombe de contacter le centre de relation client sur le
                      2255 dans un délai de 2 jours. Il est de la responsabilité
                      du l’utilisateur de s’assurer que les informations
                      (identité, adresse électronique, téléphone, données
                      voyages, etc.) saisies sur le site sont correctes. Une
                      utilisation incorrecte du site web pour des fins
                      frauduleuses donnera lieu aux correspondantes
                      responsabilités, s'il est démontré qu'il y a eu mauvaise
                      foi, culpabilité ou négligence.
                    </p>
                    <br />
                    <h5>2.2 Suivi des réclamations</h5>
                    <p>
                      Après avoir créé correctement et validé l’étape création
                      de la réclamation, l’utilisateur peut directement se
                      connecter sur le site et sur onglet « suivre ma
                      réclamation » et peut accéder à toutes les données lui
                      permettant de suivre sa réclamation. Numéro de
                      réclamation, statut de traitement / date d’envoi…..
                    </p>
                    <br />
                    <h5>2.3 Traitement de réclamation</h5>
                    <p>
                      Toutes les réclamations reçues en ligne sur le site
                      ONCF2255.ma, sont traitées dans un délai maximum de 5
                      jours, week-end et jours fériés exclus. L’utilisateur
                      recevra une réponse du centre de relation client ONCF
                      comportant les arguments et les explications fournies à sa
                      requête ainsi que le statut de traitement affecté à la
                      réclamation. En cours de traitement : si les éléments de
                      réponses sont en cours de préparation par l’ONCF. Ou si
                      l’ONCF peut demander des informations complémentaires
                      Traité : une réponse définitive est alors envoyée au
                      client et la réclamation est clôturée par l’ONCF.
                      L’utilisateur peut ne peut pas alors répondre à cette
                      réclamation fermée mais garde la possibilité de créer une
                      nouvelle réclamation sur le site oncf2255.ma Pour des
                      réclamations complexe nécessitant de mener des enquêtes
                      sur le terrain pour vérifier le fondement et la véracité
                      des faits relatés par l’utilisateur, et si le délai de 5
                      jours s’avère insuffisant et ne permet pas à l’ONCF de
                      rassembler les éléments de réponses pour des raisons
                      quelconques, l’utilisateur sera notifié que le traitement
                      de sa réclamation est toujours en cours. L’ONCF ne
                      ménagera aucun effort pour répondre dans un délai ne
                      dépassant pas 5 jours.
                    </p>
                    <br />
                    <h5>
                      III- Conditions Générales Applicables à l’utilisation su
                      site ONCF2255.ma
                    </h5>
                    <br />
                    <h5>Information Clients et confidentialité :</h5>
                    <p>
                      L’ONCF traite vos données personnelles conformément à sa «
                      charte vie privée » qui respecte les dispositions de la
                      loi 09-08 et ses textes d’application. loi 09-08
                      Promulguée par le Dahir N° 1-09-15 du 22 Safar 1430 (18
                      Février 2009) (Voir Article 5 de la loi 09-08 à la page 3)
                      Ces données ne seront utilisées que par l’ONCF, autant
                      pour le traitement que le suivi des réclamations : envoi
                      de mail de validation, de demande de complément
                      d’information. Envoi des promotions et nouvelles offres.
                      Si l’utilisateur le souhaite. Une utilisation incorrecte
                      du site web pour des fins frauduleuses donnera lieu aux
                      correspondantes responsabilités, s'il est démontré qu'il y
                      a eu mauvaise foi, culpabilité ou négligence.
                    </p>
                    <br />
                    <h5>IV- PROPRIETE INTELLECTUELLE</h5>
                    <br />
                    <h5>Généralités</h5>
                    <p>
                      ONCF2255.ma est titulaire de tous les droits de propriété
                      intellectuelle relatifs au Site qui lui appartient ou
                      détient les droits d'usage y afférents. L'accès au Site ne
                      Vous confère aucun droit sur les droits de propriété
                      intellectuelle relatifs au Site, qui reste la propriété
                      exclusive ONCF2255.ma Les éléments accessibles sur le
                      Site, notamment sous forme de textes, photographies,
                      images, icônes, cartes, sons, vidéos, logiciels, base de
                      données, données sont également protégés par des droits de
                      propriété intellectuelle et industrielle et autres droits
                      privatifs que ONCF2255.ma détient. Sauf dispositions
                      signalées dans les présentes Conditions Générales, Vous ne
                      pouvez, en aucun cas, reproduire, représenter, modifier,
                      transmettre, publier, adapter, sur quelque support que ce
                      soit, par quelque moyen que ce soit, ou exploiter de
                      quelque manière que ce soit, tout ou partie du Site sans
                      l'autorisation écrite préalable de ONCF2255.ma L'insertion
                      de liens hypertextes vers toute partie du Site est
                      interdite sans autorisation préalable et écrite
                      ONCF2255.ma Le contenu de cette application est la
                      propriété exclusive de l’ONCF. Son utilisation à des fins
                      commerciales est strictement interdite.
                    </p>
                    <br />
                    <h5>Logiciel</h5>
                    <p>
                      L'utilisation de tout logiciel téléchargé sur le Site
                      permettant d'accéder à certains services est régie par les
                      termes de la licence l'accompagnant. Vous Vous engagez à
                      ne pas installer, copier ou utiliser ce logiciel avant
                      d'avoir préalablement acquiescé aux termes de ladite
                      licence. Pour tout logiciel non accompagné d'une licence,
                      il Vous est conféré un droit d'usage temporaire, privé,
                      personnel, non transmissible et non exclusif sur ce
                      logiciel afin de pouvoir, exclusivement, accéder aux
                      services qui rendent l'utilisation de ce logiciel
                      nécessaire. En installant, ou utilisant le logiciel, Vous
                      Vous engagez à respecter cette condition.
                    </p>
                    <br />
                    <h5>V- RESPONSABILITÉ ET GARANTIES</h5>
                    <br />
                    <h5>Pour l'utilisation du site</h5>
                    <p>
                      ONCF2255.ma ne garantit pas que le Site sera exempt
                      d'anomalies, d'erreurs ou de bugs, ni que celles-ci
                      pourront être corrigées, ni que le Site fonctionnera sans
                      interruption ou pannes, ni encore qu'il est compatible
                      avec un matériel ou une configuration particulière autre
                      que ceux expressément mentionnés par ONCF2255.ma
                      ONCF2255.ma n’est en aucun cas responsables de
                      dysfonctionnements imputables à des logiciels de tiers. En
                      aucun cas, ONCF2255.ma ne sera responsables de tout type
                      de dommage prévisible ou imprévisible, matériels ou
                      immatériels (incluant la perte de profits ou
                      d'opportunité…) découlant de l'utilisation ou de
                      l'impossibilité totale ou partielle d'utiliser le Site.
                      Vous reconnaissez avoir vérifié que la configuration
                      informatique que Vous utilisez ne contient aucun virus et
                      qu'elle est en parfait état de fonctionnement. Sauf
                      dysfonctionnement du Site qui lui serait imputable,
                      ONCF2255.ma ne pourra être tenue responsable des anomalies
                      pouvant survenir en cours de Création, de traitement ou
                      d’impression de réclamation, imputables soit à votre fait,
                      soit au fait imprévisible et insurmontable d'un tiers
                      étranger à la prestation, soit à un cas de force majeure
                      (par exemple, anomalies causées par tout matériel,
                      logiciel ou moyen de connexion utilisé ou par un
                      prestataire tiers).
                    </p>
                    <br />
                  </section>
                  {/* Section for bottom content */}
                  <section>
                    <div className="text-center">
                      <h5>ANNEXE</h5>
                      <small>
                        Article 5 de la loi 09-08 relative à la protection des
                        données à caractère personnelles.
                      </small>
                    </div>
                    <br />
                    <h5>
                      Article 5 : Droit à l’information lors de la collecte des
                      données.
                    </h5>
                    <p>
                      1- Toute personne sollicitée directement, en vue d’une
                      collecte de ses données personnelles, doit être
                      préalablement informée de manière expresse, précise et non
                      équivoque par le responsable du traitement ou son
                      représentant, sauf si elle en a déjà eu connaissance, des
                      éléments suivants : a) l’identité du responsable du
                      traitement et, le cas échéant, de son représentant ; b)
                      les finalités du traitement auquel les données sont
                      destinées ; c) toute information, supplémentaires telles
                      que : - les destinataires ou les catégories de
                      destinataires ; - le fait de savoir si la réponse aux
                      questions, est obligatoire ou facultative, ainsi que les
                      conséquences éventuelles d’un défaut de réponse ; -
                      l’existence d’un droit d’accès aux données à caractère
                      personnel la concernant et de rectification de ces
                      données, dans la mesure où, compte tenu des circonstances
                      particulières dans lesquelles les données sont collectées,
                      ces informations, sont nécessaires pour assurer un
                      traitement loyal des données à l’égard de la personne
                      concernée ; d) les caractéristiques du récépissé de la
                      déclaration auprès de la Commission nationale ou celles de
                      l’autorisation délivrée par ladite commission ; 2- Les
                      documents, qui servent de base à la collecte des données à
                      caractère personnel doivent contenir les informations
                      visées au paragraphe précédent ; 3- Lorsque les données, à
                      caractère personnel n’ont pas été collectées auprès de la
                      personne concernée, le responsable du traitement ou son
                      représentant doit, avant l’enregistrement des données ou
                      si une communication de données à un tiers est envisagée,
                      au plus tard lors de la première communication de données,
                      fournir à la personne concernée au moins les informations
                      visées aux a), b) et c) ci-dessus, sauf si la personne en
                      a déjà eu connaissance. 4- En cas de collecte de données,
                      en réseaux, ouverts, la personne concernée doit être
                      informée, sauf si elle sait déjà que les données à
                      caractère personnel la concernant peuvent circuler sur les
                      réseaux sans garanties de sécurité et qu’elles risquent
                      d’être lues et utilisées, par des tiers non autorisés.
                    </p>
                  </section>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}

export default compose(translate, withRouter)(TermsCondition);
