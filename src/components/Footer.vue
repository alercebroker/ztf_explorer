<template>
    <v-footer inset app>
        <v-layout row wrap  >
              <v-flex xs1 grow
              v-for="link in links"
              :key = link.link
              >
              <a :href="link.link">
                <v-img  max-height="25px" contain :alt="link.alt" :src="link.image"> </v-img>
              </a>
              </v-flex>
        </v-layout>
    </v-footer>
</template>

<script type="text/javascript">
  export default {
    data: () => ({
      links: [
        {"alt": "U. Austral (Inf.)" , "link": "http://www.ingenieria.uach.cl/institutos/informatica.html", "image":require("@/assets/footer/UACH.png")},
        {"alt": "U.Católica (DCC)" , "link": "http://www.ing.uc.cl/ciencia-de-la-computacion/", "image":require("@/assets/footer/footerPUC.png")},
        {"alt": "U. Chile (CMM)" , "link": "http://www.cmm.uchile.cl/", "image":require("@/assets/footer/CMM.png")},
        {"alt": "U. Chile (DIE)" , "link": "http://www.die.cl/", "image":require("@/assets/footer/footerDIE.png")},
        {"alt": "U. Concepción (DCC)" , "link": "http://www.inf.udec.cl/", "image":require("@/assets/footer/udec.png")},
        {"alt": "Millenium Institute for Astrophysiscs - MAS" , "link": "http://astrofisicamas.cl/", "image":require("@/assets/footer/MAS.png")},
        {"alt": "U. Nacional Andrés Bello (DCF)" , "link": "http://fisica.unab.cl/", "image":require("@/assets/footer/unab.png")},
        {"alt": "REUNA" , "link": "http://reuna.cl/", "image":require("@/assets/footer/footerReuna.png")},
        {"alt": "Caltech (CD3)" , "link": "http://cd3.caltech.edu/", "image":require("@/assets/footer/footerCaltech.png")},
        {"alt": "Harvard U.(IACS)" , "link": "https://iacs.seas.harvard.edu/", "image":require("@/assets/footer/footerIACS.png")},
        {"alt": "Harvard U.(SEAS)" , "link": "http://www.seas.harvard.edu/", "image":require("@/assets/footer/footerSEAS.png")},
        {"alt": "U. of Washington (Dirac)" , "link": "http://dirac.astro.washington.edu/", "image":require("@/assets/footer/footerWashington.png")},

      ]
    })
  }
</script>
