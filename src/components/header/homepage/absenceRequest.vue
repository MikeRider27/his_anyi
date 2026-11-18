<template>
  <div class="absenceRequest">
    <h1 class="leave-form-title">Solicitud de permiso del empleado</h1>
    <el-form :model="ruleForm" label-position="top" class="leave-form" ref="ruleForm">
      <section class="leave-form-section">
        <h2>Puesto y departamento</h2>
        <div class="leave-form-grid">
        <el-form-item label="Unidad" prop="organization">
          <el-input v-model="ruleForm.organization"></el-input>
        </el-form-item>
        <el-form-item label="Equipo/departamento" prop="department">
          <el-input v-model="ruleForm.department"></el-input>
        </el-form-item>
        <el-form-item label="Cargo/puesto" prop="jobs">
          <el-input v-model="ruleForm.jobs"></el-input>
        </el-form-item>
        </div>
      </section>
      <section class="leave-form-section">
        <h2>Datos básicos del empleado</h2>
        <div class="leave-form-grid">
        <el-form-item label="Nombre" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="Edad" prop="age">
          <el-input v-model="ruleForm.age"></el-input>
        </el-form-item>
        <el-form-item label="N.º de empleado" prop="employeeNumber">
          <el-input v-model="ruleForm.employeeNumber"></el-input>
        </el-form-item>
        </div>
      </section>
      <section class="leave-form-section">
        <h2>Tipo de permiso</h2>
        <el-checkbox-group v-model="ruleForm.category" :min="1" :max="1" class="leave-type-options">
          <el-checkbox label="Permiso oficial"></el-checkbox>
          <el-checkbox label="Permiso por matrimonio"></el-checkbox>
          <el-checkbox label="Permiso por fallecimiento"></el-checkbox>
          <el-checkbox label="Permiso por maternidad"></el-checkbox>
          <el-checkbox label="Vacaciones anuales"></el-checkbox>
          <el-checkbox label="Visita familiar"></el-checkbox>
          <el-checkbox label="Baja por enfermedad"></el-checkbox>
          <el-checkbox label="Otros"></el-checkbox>
        </el-checkbox-group>
      </section>
      <section class="leave-form-section">
        <h2>Detalle del permiso</h2>
        <div class="leave-form-grid">
        <el-form-item label="Motivo" prop="reason" class="leave-form-wide">
          <el-input type="textarea" v-model="ruleForm.reason" :rows="3"></el-input>
        </el-form-item>
        <el-form-item label="Fechas del permiso" prop="absenceTime" class="leave-form-wide">
          <el-date-picker v-model="ruleForm.absenceTime" type="daterange" range-separator="a" start-placeholder="Fecha de inicio" end-placeholder="Fecha de fin" :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="__días __ horas" prop="totalTime">
          <el-input v-model="ruleForm.totalTime"></el-input>
        </el-form-item>
        </div>
      </section>
      <section class="leave-form-section">
        <h2>Dictamen</h2>
        <div class="leave-form-grid">
        <el-form-item label="Firma del jefe de departamento" prop="departmentManager">
          <el-input v-model="ruleForm.departmentManager"></el-input>
        </el-form-item>
        <el-form-item label="Firma del director" prop="director">
          <el-input v-model="ruleForm.director"></el-input>
        </el-form-item>
        <p class="leave-form-note">Nota: una vez aprobado, entregue este formulario a la oficina para su archivo.</p>
        </div>
      </section>
      <div class="leave-form-actions">
        <el-form-item>
          <el-button type="primary" @click="onSubmit">Crear ahora</el-button>
          <el-button @click="offReset">Restablecer</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  data () {
    return {
      ruleForm: {
        organization: '',
        department: '',
        jobs: '',
        name: '',
        age: '',
        employeeNumber: '',
        category: [],
        reason: '',
        absenceTime: [],
        totalTime: '',
        departmentManager: '',
        director: ''
      },
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() < Date.now - 8.64e7;
        }
      }
    };
  },
  methods: {
    onSubmit () {
      // let me = this;
      // this.$http.post(api.addPatient).then(function (response) {
      //   me.ruleForm = me.data.ruleForm;
      // }, function (response) {
      // });
    },
    offReset () {
      this.ruleForm = {
        organization: '',
        department: '',
        jobs: '',
        name: '',
        age: '',
        employeeNumber: '',
        category: [],
        reason: '',
        absenceTime: [],
        totalTime: '',
        departmentManager: '',
        director: ''
      };
    }
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .absenceRequest
    max-width:100%

    .leave-form-title
      margin:0 0 24px
      color:#263b4d
      font-size:24px
      font-weight:600
      text-align:center

    .leave-form-section
      margin-bottom:24px

      h2
        margin:0 0 16px
        color:#34495e
        font-size:18px
        font-weight:600

    .leave-form-grid
      display:grid
      grid-template-columns:repeat(3, minmax(0, 1fr))
      gap:16px 24px

      .el-form-item
        min-width:0
        margin:0 !important

      .el-form-item__label
        float:none
        width:100% !important
        padding:0 0 6px
        line-height:1.4
        text-align:left
        white-space:normal

      .el-form-item__content
        min-width:0
        margin-left:0 !important

      .el-input,
      .el-date-editor
        width:100%

      .leave-form-wide
        grid-column:1 / -1

      .el-textarea__inner
        min-height:84px

    .leave-type-options
      display:grid
      grid-template-columns:repeat(4, minmax(0, 1fr))
      gap:12px 18px

      .el-checkbox
        display:flex
        align-items:flex-start
        min-width:0
        margin:0
        white-space:normal

      .el-checkbox__label
        white-space:normal
        line-height:1.4

    .leave-form-note
      grid-column:1 / -1
      margin:0
      padding:12px 14px
      border-radius:8px
      background:#f5f8fa
      color:#607587
      line-height:1.5

    .leave-form-actions
      display:flex
      justify-content:center
      padding-top:8px

      .el-form-item
        margin:0 !important

      .el-form-item__content
        display:flex
        justify-content:center
        gap:10px
        margin-left:0 !important

  @media (max-width: 900px)
    .absenceRequest
      .leave-form-grid
        grid-template-columns:repeat(2, minmax(0, 1fr))

      .leave-type-options
        grid-template-columns:repeat(2, minmax(0, 1fr))

  @media (max-width: 600px)
    .absenceRequest
      .leave-form-grid,
      .leave-type-options
        grid-template-columns:minmax(0, 1fr)

      .leave-form-actions .el-form-item__content
        flex-wrap:wrap
</style>