<template>
  <div class="officeComplaint">
  <!-- Tabs Tabs -->
    <el-tabs v-model="activeName">
      <el-tab-pane label="Mensajes de pacientes" name="first">
        <template>
        <!-- Table -->
          <el-table :data="complaintPatientList" stripe style="width: 100%">
            <el-table-column prop="name" label="Nombre del paciente" min-width="150" show-overflow-tooltip></el-table-column>
            <el-table-column prop="date" label="Fecha de la queja" min-width="150"></el-table-column>
            <el-table-column prop="containts" label="Contenido de la queja" min-width="220" show-overflow-tooltip></el-table-column>
            <el-table-column label="Acciones" width="260" align="center" class-name="patient-complaint-actions">
              <template slot-scope="scope">
                <div class="row-actions">
                  <el-button size="mini" icon="el-icon-user" @click.native.prevent="lookforPatient(scope.$index)">Ver datos del paciente</el-button>
                  <el-button size="mini" type="danger" icon="el-icon-delete" @click.native.prevent="delectPatient(scope.$index, complaintPatientList)">Eliminar</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        <!-- Table -->
        </template>
      </el-tab-pane>
      <el-tab-pane label="Tramitación de quejas" name="second">
        <div class="importants">
          <h1>{{complaintList.tittle}}</h1>
          <h3>{{complaintList.subheading}}</h3>
          <h2>1. Vías y canales de queja</h2>
            <ol>
              <li v-for="item in complaintList.ways">{{item}}</li>
            </ol>
          <h2>2. Departamentos y ámbito de atención de quejas</h2>
            <ol>
              <li v-for="item in complaintList.offices">{{item}}</li>
            </ol>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Opinión del médico" name="third">
        <div class="doctor-opinion">
          <h1>Registrar opinión</h1>
          <el-input type="textarea" :rows="8" placeholder="Escriba aquí su opinión" v-model="textarea">
          </el-input>
          <div class="opinion-actions">
            <el-button @click="getEmpty">Vaciar</el-button>
            <el-button type="primary" icon="el-icon-check" @click="save">Guardar</el-button>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-dialog title="Detalle del paciente" :visible.sync="dialogFormVisible" :before-close="handleClose" custom-class="app-dialog" append-to-body>
      <ul class="patientMessage">
        <li><h3>Nombre del paciente:</h3><span>{{messages.name}}</span></li>
        <li><h3>N.º de cita:</h3><span>{{messages.number}}</span></li>
        <li><h3>Sexo:</h3><span>{{messages.sex}}</span></li>
        <li><h3>Edad:</h3><span>{{messages.age}}</span></li>
        <li><h3>Especialidad:</h3><span>{{messages.disease}}</span></li>
        <li><h3>Estado de salud:</h3><span>{{messages.symptoms}}</span></li>
        <li><h3>Teléfono móvil:</h3><span>{{messages.phone}}</span></li>
        <li><h3>Dirección:</h3><span>{{messages.position}}</span></li>
        <li><h3>Fecha:</h3><span>{{messages.date}}</span></li>
      </ul>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancelar</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">Aceptar</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
    import {api} from '../../../global/api.js';
    export default {
      data () {
        return {
          dialogFormVisible: false,
          complaintList: [],
          complaintPatientList: [],
          messages: [],
          patientList: [],
          activeName: 'second',
          Index: '',
          textarea: ''
        };
      },
      methods: {
        handleClose (done) {
          this.$confirm('¿Confirmar cierre?')
            .then(_ => {
              done();
            })
            .catch(_ => {});
        },
        lookforPatient (index) {
          this.dialogFormVisible = true;
          this.Index = index;
          for (let i = 0; i < this.patientList.length; i++) {
            if (this.complaintPatientList[this.Index].name === this.patientList[i].name) {
              this.messages = this.patientList[i];
            };
          };
        },
        delectPatient (index, rows) {
          rows.splice(index, 1);
        },
        getEmpty () {
          this.textarea = '';
        },
        save () {
          if (this.textarea === '') {
            this.$message({
              showClose: true,
              message: '¡Error al guardar!',
              type: 'error'
            });
          } else {
            this.$message({
              showClose: true,
              message: '¡Guardado correctamente!',
              type: 'success'
            });
          }
        }
      },
      created () {
        this.$http.get(api.complaintPatient).then((response) => {             // mark
          this.complaintList = response.body.complaintList;
          this.complaintPatientList = response.body.complaintPatientList;
        }, response => {
          // error callback
          this.$message.error('No se pudieron cargar las quejas. Inténtalo de nuevo más tarde.');
        });
        this.$http.get(api.registered).then((response) => {             // mark
          this.patientList = response.body.tableData;
        }, response => {
          // error callback
          this.$message.error('No se pudo cargar la información de pacientes. Inténtalo de nuevo más tarde.');
        });
      }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .officeComplaint
    .doctor-opinion
      box-sizing:border-box
      max-width:900px
      margin:8px auto 0
      padding:24px
      border:1px solid #e4ebef
      border-radius:12px
      background:#fff
      box-shadow:0 4px 18px rgba(38, 59, 77, 0.04)

      h1
        margin:0 0 16px
        color:#263b4d
        font-size:18px
        font-weight:600

      .el-textarea__inner
        min-height:200px !important
        padding:14px 16px
        line-height:1.6

    .opinion-actions
      display:flex
      justify-content:flex-end
      gap:8px
      margin-top:14px

      .el-button + .el-button
        margin-left:0

    .patient-complaint-actions
      .cell
        padding:8px

      .row-actions
        display:flex
        justify-content:center
        gap:6px

        .el-button + .el-button
          margin-left:0

    .importants
      max-width:1100px
      margin:0 auto
      padding:28px 32px
      border:1px solid #e4ebef
      border-radius:12px
      background:#fff
      box-shadow:0 4px 18px rgba(38, 59, 77, 0.04)

      h1
        margin:0 0 18px
        color:#263b4d
        font-size:22px
        font-weight:600
        line-height:1.4

      h3
        margin:0 0 24px
        padding:14px 16px
        border-left:4px solid #e6a23c
        border-radius:6px
        background:#fdf6ec
        color:#8a5a16
        font-size:14px
        font-weight:500
        line-height:1.6

      h2
        margin:26px 0 12px
        padding-bottom:10px
        border-bottom:1px solid #e8eef2
        color:#34495e
        font-size:17px
        font-weight:600

      ol
        margin:0
        padding-left:24px

      li
        margin:0 0 12px
        padding-left:4px
        color:#526779
        font-size:14px
        line-height:1.65

    .patientMessage
      margin:0
      padding:0

      li
        display:flex
        align-items:flex-start
        gap:18px
        padding:10px 0
        border-bottom:1px solid #eef2f5
        font-size:15px

      h3
        flex:0 0 150px
        margin:0
        color:#40566a
        font-weight:600

      span
        min-width:0
        color:#657b8d
        overflow-wrap:anywhere

  @media (max-width: 700px)
    .officeComplaint
      .doctor-opinion
        padding:18px

      .opinion-actions
        justify-content:flex-start

      .patient-complaint-actions
        .row-actions
          flex-wrap:wrap

      .importants
        padding:20px 18px

        h1
          font-size:20px

      .patientMessage li
        flex-direction:column
        gap:4px
</style>
