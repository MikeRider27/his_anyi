<template>
  <div class="hisIntroduction">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="Presentación del hospital" name="first">
      <div class="theme">
        <img src="../logo/AnYi.logo.jpg" width="50px" height="50px">
        <span class="span_font">Presentación del hospital</span>
      </div>
      <div class="introduction">
      <p style="line-height:30px"><em style="font-size:24px">El Hospital Anyi de Guangzhou</em> es un hospital general sin ánimo de lucro de nivel II-A que integra atención médica, docencia, investigación, prevención y salud. Fundado en 2017 y situado al este de Guangzhou, es uno de los hospitales públicos más conocidos de la ciudad; atiende la asistencia, la salud y la prevención de enfermedades de cientos de miles a millones de habitantes, es hospital docente de una facultad de medicina de Guangdong y su influencia alcanza a toda Guangzhou y sus alrededores.
       <p style="line-height:30px;text-indent:2em">El hospital ocupa 40.000 m² de terreno y más de 60.000 m² construidos; dispone de 448 camas, más de 700 empleados y 5 centros ambulatorios, con más de 1 millón de consultas externas y más de 20.000 ingresos al año.</p>  
       <p style="line-height:30px;text-indent:2em">Cuenta con un gran número de profesionales técnicos de nivel alto y medio, como catedráticos, y con equipos avanzados de primer nivel nacional: resonancia magnética Philips de 1,5 T, TC helicoidal GE, rayos X digitales Philips, CR Konica, DR Kodak, analizador bioquímico automático Olympus, ecografía 3D en tiempo real Philips iU22, facoemulsificador de cataratas Alcon, laparoscopio y gastroscopio Olympus, entre otros.</p>
       <p style="line-height:30px;text-indent:2em">Departamentos del hospital: Urgencias, Medicina Interna (I y II), Cirugía (I y II), Ginecología y Obstetricia, Pediatría, UCIN, Cirugía de la Mano, Urología, Neurocirugía, UCI, Otorrinolaringología y Oftalmología, Medicina China y Rehabilitación, Quirófanos, Anestesiología, Odontología, Dermatología, Pruebas Funcionales, Laboratorio, Diagnóstico por Imagen, etc. Dispone de quirófanos de flujo laminar de clase 1.000 y 10.000 según estándares internacionales, lo que permite aplicar nuevas técnicas especializadas de alta complejidad.</p>
       <p style="line-height:30px;text-indent:2em">El hospital asume como misión salvar vidas y atender a los heridos, con el beneficio social como objetivo, y se entrega a ofrecer a la población un servicio médico de calidad. Ha recibido en la provincia de Guangdong los títulos de «Unidad Ejemplar», «Ventanilla Ejemplar», «Cien Hospitales Ejemplares» y «Puesto Modelo de Mujeres», y en Dongguan los de «Unidad Ejemplar», «Unidad Modelo» y «Unidad Abanderada», entre otros.</p>
      </p>
      </div>
      <div class="picture-display">
        <ul>
          <li><img src="../logo/picture1.jpg" width="300px" height="200px"></li>
          <li><img src="../logo/picture2.jpg" width="300px" height="200px"></li>
          <li><img src="../logo/picture3.jpg" width="300px" height="200px"></li>
          <li><img src="../logo/picture4.jpg" width="300px" height="200px"></li>
        </ul>
      </div>
      </el-tab-pane>
      <el-tab-pane label="Guía de atención" name="second">
      <div class="theme">
        <img src="../logo/AnYi.logo.jpg" width="50px" height="50px">
        <span class="span_font">Guía de atención</span>
      </div>
      <el-steps :space="100" direction="vertical" :active="1">
        <el-step title="Paso 1 " description="—— Preparación de documentos: lleve lo necesario para la consulta, como DNI, tarjeta de la seguridad social, tarjeta bancaria y suficiente efectivo. Si tiene historial clínico, tráigalo; también la tarjeta de seguro médico cooperativo rural si la tiene. Para partos, prepare el libro de familia y el permiso de natalidad.">
        </el-step>
        <el-step title="Paso 2" description="—— Registro de citas"></el-step>
        <el-step title="Paso 3" description="—— Consultas externas: tras registrarse, puede que deba esperar a que le indiquen a qué consulta acudir. Allí el médico correspondiente le diagnosticará y tratará."></el-step>
        <el-step title="Paso 4" description="—— Caja: en consultas externas"></el-step>
        <el-step title="Paso 5" description="—— Tratamiento: cuando tenga los resultados, muéstrelos al médico que le atiende. Según el informe, el médico indicará el tratamiento adecuado; las intervenciones quirúrgicas requieren su consentimiento. Para enfermedades comunes se le recetarán medicamentos.">
        </el-step>
        <el-step title="Paso 6" description="—— Recogida en farmacia: con la receta del médico, pague primero en caja. Entregue la receta al cajero y recoja los medicamentos en la farmacia.">
        </el-step>
        <el-step title="Paso 7" description="—— Revisiones periódicas: por su salud, acuda a las revisiones que le indique el médico y tome la medicación según sus indicaciones. Ante cualquier duda llame a la línea de atención del hospital.">
        </el-step>
      </el-steps>
      </el-tab-pane>
      <el-tab-pane label="Departamentos" name="third">
      <div class="theme">
        <img src="../logo/AnYi.logo.jpg" width="50px" height="50px">
        <span class="span_font">Departamentos</span>
      </div>
      <div class="card">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="line-height: 36px;">Departamentos no quirúrgicos</span>
            <el-button style="float: right;" type="primary" @click="check1">Ver más</el-button>
          </div>
          <div v-for="o in items1" :key="o" class="text item">
            {{ o }}
          </div>
        </el-card>
      </div>
      <div class="card">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="line-height: 36px;">Departamentos quirúrgicos</span>
            <el-button style="float: right;" type="primary" @click="check2">Ver más</el-button>
          </div>
          <div v-for="o in items2" :key="o" class="text item">
            {{ o }}
          </div>
        </el-card>
      </div>
      <div class="card">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="line-height: 36px;">Departamentos de diagnóstico</span>
            <el-button style="float: right;" type="primary" @click="check3">Ver más</el-button>
          </div>
          <div v-for="o in items3" :key="o" class="text item">
            {{ o }}
          </div>
        </el-card>
      </div>
      </el-tab-pane>
      <el-tab-pane label="Cultura del hospital" name="fourth">
      <div class="theme">
        <img src="../logo/AnYi.logo.jpg" width="50px" height="50px">
        <span class="span_font">Cultura del hospital</span>
      </div>
      <div class="culture">
        <span style="font-size:20px;color:#75604F">«Espíritu Peking Union»: rigor, excelencia, diligencia y entrega</span>
        <p style="text-indent:4em">
          «Rigor, excelencia, diligencia y entrega»: el espíritu Peking Union es el valor central y la esencia de la cultura del hospital. Esta cultura tiene como núcleo el respeto por la ciencia y el conocimiento, la actitud y el espíritu profesionales, con un profundo carácter humanista; se expresa con seriedad y contención, sin ostentación ni precipitación, y valora la reputación. Se refleja en su personal en un estilo científico riguroso, una sólida tradición humanista y apertura académica. Como dijo el antiguo director Dong Bingkun, el espíritu Peking Union nace de la confluencia de dos corrientes: la dedicación fiel a la ciencia y la entrega fiel al pueblo.<br/></p>
        <p style="text-indent:4em">Este espíritu se manifiesta en las ideas y actos de cada miembro del hospital y se transmite de generación en generación mediante el ejemplo y la enseñanza. Recordar a los veteranos es heredar su gloriosa tradición. Durante años el hospital ha celebrado sin interrupción actos conmemorativos, concursos de oratoria y voluntariado juvenil para reforzar esta formación entre el personal; recientemente ha impulsado su boletín y su web y se ha apoyado en los medios de comunicación para difundir su espíritu y su cultura. Bajo esta cultura, la cultura propia de cada departamento también se ha enriquecido y desarrollado.<br/></p>  
        <p style="text-indent:4em">En la asistencia, la docencia, la investigación y la gestión, el hospital cultiva a su manera el espíritu, la cultura y el talento Peking Union. La tradición cultural formada durante más de ochenta años une todas sus fuerzas internas y guía a su personal hacia el objetivo de poner a las personas y al paciente en el centro.</p>
        <span style="font-size:20px;color:#75604F">Los tres tesoros: catedráticos, historias clínicas y biblioteca</span>
        <p style="text-indent:4em"> El hospital tiene «tres tesoros»: catedráticos, historias clínicas y biblioteca. Sus historias clínicas guardan un material clínico riquísimo y valioso, registro de la técnica, la experiencia y el razonamiento clínico de su personal, y son la base de la docencia y la investigación. Algunas historias de personajes célebres se han convertido en valiosos documentos históricos</p>
        <span style="font-size:20px;color:#75604F">Origen de la tradición de «las tres bases y los tres rigores»</span>
        <p style="text-indent:4em">En 1962, en el «Resumen preliminar de la experiencia docente de la antigua Facultad de Medicina Peking Union», la escuela propuso el célebre principio de «las tres bases y los tres rigores». En el estudio se deben cuidar las tres bases: teoría básica, conocimientos básicos y habilidades básicas; en el estudio, el trabajo y la investigación se exigen los tres rigores: actitud seria, exigencia estricta y método riguroso. El hospital mantiene hasta hoy este principio en la formación médica y de profesionales.</p>
      </div>
      <div class="culture">
         <span style="font-size:20px;color:#75604F">El legado centenario</span>
         <p style="font-size:24px;margin-top:60px;">Excelencia académica</p>
         <p style="margin-top:20px">Innovación: respeto por la ciencia, la innovación como alma</p>
         <p>Debate: debate académico, apertura y tolerancia</p>
         <p>Colaboración: visión internacional, trabajo en equipo</p>
         <p>Liderazgo: búsqueda de la excelencia, liderazgo continuo</p>
         <p style="font-size:24px;margin-top:60px;">Calidad </p>
         <p style="margin-top:20px">Precisión: técnica médica excelente, servicio de calidad</p>
         <p>Eficiencia: alto rendimiento y bajo consumo, ejecución firme</p>
         <p>Inteligencia: hospital digital, medicina inteligente</p>
         <p>Limpieza: orden y pulcritud, un hospital bello</p>
         <p style="font-size:24px;margin-top:60px;">Humanismo</p>
         <p style="margin-top:20px">Respeto: igualdad y respeto, reverencia por la vida</p>
         <p>Personas: las personas primero, cada uno según su talento</p>
      </div>
      </el-tab-pane>
    </el-tabs>

    <div class="dialog1">
      <el-dialog title="No quirúrgicos" :visible.sync="dialogVisible1" width="30%" :before-close="handleClose" custom-class="app-dialog" append-to-body>
        <div v-for="i in dialog1" :key="i">{{ i }}</div>
      </el-dialog>
    </div>
    <div class="dialog">
      <el-dialog title="Quirúrgicos" :visible.sync="dialogVisible2" width="30%" :before-close="handleClose" custom-class="app-dialog" append-to-body>
        <div v-for="i in dialog2" :key="i">{{ i }}</div>
      </el-dialog>
    </div>
    <div class="dialog">
      <el-dialog title="Departamentos de diagnóstico" :visible.sync="dialogVisible3" width="30%" :before-close="handleClose" custom-class="app-dialog" append-to-body>
        <div v-for="i in dialog3" :key="i">{{ i }}</div>
      </el-dialog>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        activeName: 'first',
        dialogVisible1: false,
        dialogVisible2: false,
        dialogVisible3: false,
        items1: ['Medicina Interna', 'Cardiología', 'Neumología', 'Gastroenterología', 'Nefrología'],
        items2: ['Cirugía', 'Cirugía General', 'Traumatología', 'Cirugía Cardíaca', 'Cirugía Torácica'],
        items3: ['Ecografía', 'Anatomía Patológica', 'Laboratorio', 'Radiología', 'Radioterapia'],
        dialog1: ['Hematología', 'Reumatología e Inmunología', 'Enfermedades Infecciosas', 'Medicina General', 'Oncología Médica', 'Medicina InternaICU', 'Endocrinología', 'Nutrición Parenteral y Enteral', 'Medicina Intensiva(ICU)', 'Pediatría', 'Neurología', 'Psicología Médica', 'Dermatología', 'Alergología', 'Urgencias', 'Medicina China', 'Geriatría'],
        dialog2: ['Urología', 'Neurocirugía', 'Cirugía Vascular', 'Cirugía Plástica y Estética', 'Cirugía de Mama', 'Cirugía Hepática', 'Ginecología y Obstetricia', 'Oftalmología', 'Otorrinolaringología', 'Odontología', 'Anestesiología'],
        dialog3: ['Medicina Nuclear', 'Nutrición', 'Transfusiones', 'Farmacia Hospitalaria', 'Archivo de Historias Clínicas', 'Medicina Física y Rehabilitación', 'Centro de Clasificación de Enfermedades']
      };
    },
    methods: {
      handleClick (tab, event) {
      },
      // See more
      check1 () {
        this.dialogVisible1 = true;
      },
      check2 () {
        this.dialogVisible2 = true;
      },
      check3 () {
        this.dialogVisible3 = true;
      },
      handleClose (done) {
        this.$confirm('¿Confirmar cierre?')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .hisIntroduction .span_font
    font-size:24px
    color:blue
  .hisIntroduction .introduction
    width:700px
    height:550px
    float:left
    position:relative
    margin-top:50px
  .hisIntroduction .picture-display
    float:right
    width:600px
    height:500px
  .hisIntroduction .picture-display ul li
    float:left
    margin-top:50px
  .hisIntroduction .card
    float:left
    margin-top:50px
    padding-left:20px
  .hisIntroduction .text
    font-size:14px
  .hisIntroduction .item
    padding:18px 0
  .hisIntroduction .clearfix:before, .clearfix:after
    display: table
    content: ""
  .hisIntroduction .clearfix:after
    clear: both
  .hisIntroduction .box-card
    width: 420px
    background:green
  .hisIntroduction .culture
    margin:auto
    margin-top:50px
    width:500px 
    padding-left:150px
    float:left
</style>