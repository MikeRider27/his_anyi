<template>
  <div class="innnerApp">
    <div class="app-body" :class="{ 'is-expanded': !isCollapse }">
      <div class="menu" :class="{ smallNav: isCollapse }">
        <div class="sidebar-brand">
          <span class="brand-icon" aria-hidden="true"><i class="icon-hospital"></i></span>
          <span class="brand-copy">
            <strong>Hospital Anyi</strong>
            <small>Gestión hospitalaria</small>
          </span>
        </div>
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo" :collapse="isCollapse" background-color="#324157" text-color="#bfcbd9" active-text-color="#20a0ff">
          <el-menu-item index="1" @click="navToggle" :aria-label="isCollapse ? 'Expandir menú' : 'Contraer menú'" :aria-expanded="!isCollapse">
            <template>
              <i :class="{ 'icon-packUp': !isCollapse ,'icon-spread': isCollapse }"></i>
              <span slot="title">Contraer/expandir panel</span>
            </template>
          </el-menu-item>
          <el-menu-item index="home" class="home-menu-item" @click="goHome">
            <i class="el-icon-s-home"></i>
            <span slot="title">Inicio</span>
          </el-menu-item>
          <el-submenu index="2" v-if="type === '01' || type === '03'">
            <template slot="title">
              <i class="icon-nurse"></i>
              <span slot="title">Sistema de gestión de enfermería</span>
            </template>
            <el-menu-item-group>
              <span slot="title">Gestión del personal de enfermería</span>
              <el-menu-item index="2-1"><router-link to="addNurse">Añadir enfermero(a)</router-link></el-menu-item>
              <el-menu-item index="2-2"><router-link to="hasNurse">Enfermeros(as) registrados</router-link></el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Trabajo diario y otros">
              <el-menu-item index="2-3"><router-link to="shift">Turnos</router-link></el-menu-item>
              <el-menu-item index="2-5"><router-link to="turnOver">Movimiento de personal</router-link></el-menu-item>
              <el-menu-item index="2-6"><router-link to="complainInfo">Ver quejas</router-link></el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3" v-if="type === '01' || type === '02'">
            <template slot="title">
              <i class="icon-doctor"></i>
              <span slot="title">Sistema de gestión de médicos</span>
            </template>
            <el-menu-item-group>
              <span slot="title">Gestión del personal médico</span>
              <el-menu-item index="3-1"><router-link to="addDoctor">Añadir médico</router-link></el-menu-item>
              <el-menu-item index="3-2"><router-link to="editDoctor">Editar médico</router-link></el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Trabajo diario y otros">
              <el-menu-item index="3-3"><router-link to="shiftDoctor">Turnos</router-link></el-menu-item>
              <el-menu-item index="3-4"><router-link to="staffFlow">Movimiento de personal</router-link></el-menu-item>
              <el-menu-item index="3-5"><router-link to="officeComplaints">Quejas por departamento</router-link></el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4" v-if="type === '01' || type === '04'">
            <template slot="title">
              <i class="icon-checkstand"></i>
              <span slot="title">Sistema de caja</span>
            </template>
            <el-menu-item-group>
              <span slot="title">Registro y caja</span>
              <el-menu-item index="4-1"><router-link to="register">Registro de citas</router-link></el-menu-item>
              <el-menu-item index="4-2"><router-link to="registerManage">Gestionar registros</router-link></el-menu-item>
              <el-menu-item index="4-3"><router-link to="takecash">Cobros</router-link></el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="5" v-if="type === '01' || type === '05'">
            <template slot="title">
              <i class="icon-pharmacy"></i>
              <span slot="title">Sistema de farmacia</span>
            </template>
            <el-menu-item-group>
              <span slot="title">
                <i class="icon-chineseMedicine"></i>Farmacia de medicina china
              </span>
              <el-menu-item index="5-1"><router-link to="prescriptionManageC">Procesar recetas</router-link></el-menu-item>
              <el-menu-item index="5-2"><router-link to="drugInfosC">Consultar medicamentos</router-link></el-menu-item>
              <el-menu-item index="5-3"><router-link to="drugApplyC">Solicitar reabastecimiento</router-link></el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <span slot="title">
                <i class="icon-WesternMedicine"></i>Farmacia de medicina occidental
              </span>
              <el-menu-item index="5-4"><router-link to="prescriptionManageW">Procesar recetas</router-link></el-menu-item>
              <el-menu-item index="5-5"><router-link to="drugInfosW">Consultar medicamentos</router-link></el-menu-item>
              <el-menu-item index="5-6"><router-link to="drugApplyW">Solicitar reabastecimiento</router-link></el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="6" v-if="type === '01' || type === '06'">
            <template slot="title">
              <i class="icon-DrugStorage"></i>
              <span slot="title">Sistema de almacén de medicamentos</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="6-1"><router-link to="drugStorage">Entrada de medicamentos</router-link></el-menu-item>
              <el-menu-item index="6-2"><router-link to="checkDrugStorage">Ver almacén</router-link></el-menu-item>
              <el-menu-item index="6-3"><router-link to="stockRemoval">Salida de medicamentos</router-link></el-menu-item>
              <el-menu-item index="6-4"><router-link to="trashy">Medicamentos desperdiciados</router-link></el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="7">
            <template slot="title">
              <i class="icon-patient"></i>
              <span slot="title">Sistema de gestión de pacientes</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="7-1" v-if="type === '01'  || type === '04'"><router-link to="addPatient">Crear expediente de paciente</router-link></el-menu-item>
              <el-menu-item index="7-2"><router-link to="hasPatient">Ver lista de pacientes</router-link></el-menu-item>
              <el-menu-item index="7-3"><router-link to="hasRegistered">Ver lista de citas de pacientes</router-link></el-menu-item>
              <el-menu-item index="7-4" v-if="type === '01' || type === '02'"><router-link to="addHospitalized">Crear expediente de hospitalización</router-link></el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="8">
            <template slot="title">
              <i class="icon-hospital"></i>
              <span slot="title">Información básica del hospital</span>
            </template>
            <el-menu-item-group>
              <!-- <el-menu-item index="8-1"><router-link to="hisIntroduction">Hospital introduction</router-link></el-menu-item> -->
              <el-menu-item index="8-2"><router-link to="staffIntroduction">Médicos y enfermeros</router-link></el-menu-item>
              <el-menu-item index="8-3"><router-link to="patientCount">Estadística semanal de pacientes atendidos</router-link></el-menu-item>
              <el-menu-item index="8-4"><router-link to="patientFeedback">Opiniones de pacientes</router-link></el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </div>
      <div class="content">
        <v-header></v-header>
        <div class="tagcontent">
          <transition name="HISshow">
            <router-view></router-view>
          </transition>
        </div>
        <footer class="app-footer">
          © Todos los derechos reservados · MikeRider27 · Versión 1.0
        </footer>
    </div>
  </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import header from '../header/header.vue';
  export default {
    name: 'app',
    data () {
      return {
        isCollapse: false,
        userLogin: '',
        type: ''
      };
    },
    methods: {
      // Toggle left navigation open/closed
      navToggle () {
        this.isCollapse = !this.isCollapse;
      },
      goHome () {
        if (this.$route.path !== '/home') {
          this.$router.push({path: '/home'});
        }
      }
    },
    created: function () {
      // Get user info and check whether the user is logged in
      if (sessionStorage.getItem('easeHis')) {
        this.userLogin = true;
        this.type = sessionStorage.getItem('easeHisType');
      } else {
        this.userLogin = false;
      }
    },
    components: {
      'v-header': header
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
.innnerApp
  position:fixed
  top:0
  right:0
  bottom:0
  left:0
  background-color:#fff
  height:100%
  overflow:hidden
  .el-menu-item>a
    display:inline-block
    height:auto
    width:100%
    color:#bfcbd9
    line-height:inherit
    white-space:normal
    text-decoration:none
    &.router-link-active
      color: #20a0ff
  .app-body
    height:100%
    .menu
      box-sizing: border-box
      display:flex
      flex-direction:column
      position:fixed
      top:0
      left:0
      z-index:1000
      height:100%
      width:288px
      overflow-x:hidden
      overflow-y:auto
      background:linear-gradient(180deg, #263b4d 0%, #203448 100%)
      box-shadow:2px 0 16px rgba(24, 42, 59, 0.12)
      transition: width 0.25s ease
      .sidebar-brand
        box-sizing:border-box
        display:flex
        flex:0 0 auto
        align-items:center
        min-height:76px
        padding:14px 18px
        border-bottom:1px solid rgba(255, 255, 255, 0.1)
        color:#fff

        .brand-icon
          display:flex
          flex:0 0 40px
          align-items:center
          justify-content:center
          width:40px
          height:40px
          margin-right:12px
          border-radius:12px
          background:rgba(78, 190, 174, 0.16)
          color:#79d3c3
          font-size:20px

        .brand-copy
          display:flex
          flex-direction:column
          min-width:0
          gap:4px

          strong
            font-size:15px
            font-weight:600
            letter-spacing:0.2px

          small
            color:#aab9c8
            font-size:12px
      > .el-menu
        flex:1 1 auto
        min-height:0
        width: 100%
        padding:8px 0 20px
        border-right:0
        background:transparent
        overflow-y:auto

      .el-submenu__title
        box-sizing:border-box
        display:flex
        align-items:center
        min-height:58px
        height:auto
        padding:11px 40px 11px 18px !important
        color:#d5e0e8 !important
        font-size:13px
        line-height:1.4
        white-space:normal

        > span
          display:block
          flex:1
          min-width:0
          white-space:normal
          overflow-wrap:anywhere

        > i:first-child
          flex:0 0 20px
          width:20px
          margin-right:12px
          color:#9cb7c7
          font-size:17px
          text-align:center

        .el-submenu__icon-arrow
          right:16px
          margin-top:-4px
          color:#9cb7c7

        &:hover
          background:rgba(255, 255, 255, 0.07) !important

      .el-menu-item
        box-sizing:border-box
        min-height:44px
        height:auto
        padding:10px 16px 10px 50px
        color:#b8c7d4
        font-size:13px
        line-height:1.4
        white-space:normal

        &:hover
          background:rgba(255, 255, 255, 0.07) !important

        &.is-active
          background:rgba(49, 171, 158, 0.16) !important
          color:#8ce0d1 !important

      .home-menu-item
        padding-left:18px !important

        > i
          width:20px
          margin-right:12px
          color:#9cb7c7
          font-size:17px
          text-align:center

      .el-menu-item-group__title
        padding:12px 18px 6px 50px
        color:#8399aa
        font-size:11px
        line-height:1.4
        white-space:normal

      &.smallNav
        width:68px
        overflow-y: visible
        .sidebar-brand
          justify-content:center
          padding:12px 8px

          .brand-icon
            margin-right:0

          .brand-copy
            display:none

        .el-menu-item,
        .el-submenu__title
          span
            display:none
          .el-submenu__icon-arrow
            display:none
    .content
      display:flex
      flex-direction:column
      height:100%
      box-sizing: border-box
      overflow:hidden
      padding-left:68px
      transition: padding-left 0.25s ease
      .app-footer
        flex:0 0 auto
        padding:10px 24px
        border-top:1px solid #e8edf1
        color:#718397
        font-size:12px
        line-height:1.4
        text-align:center

      .tagcontent
        box-sizing:border-box
        flex:1
        min-height:0
        overflow-y:auto
        padding:24px

        .listing-page-title
          margin:0 0 20px
          color:#263b4d
          font-size:22px
          font-weight:600
          line-height:1.35

        .title,
        .tittle
          display:block
          margin:0 0 20px
          color:#263b4d
          font-size:22px
          font-weight:600
          line-height:1.35

        .filter-container,
        .search,
        .replyBtn,
        .headerBt
          display:flex
          flex-wrap:wrap
          align-items:center
          gap:10px
          margin:0 0 18px
          padding:14px
          border:1px solid #e4ebef
          border-radius:10px
          background:#f8fafb

          .el-input,
          .el-select
            max-width:100%

          .el-input__inner
            border-color:#d8e2e9
            border-radius:7px

        .el-table
          overflow:hidden
          margin-bottom:18px
          border:1px solid #e4ebef
          border-radius:10px
          box-shadow:0 3px 14px rgba(38, 59, 77, 0.04)

          &::before
            display:none

          th.el-table__cell
            background:#f3f7f9
            color:#40566a
            font-weight:600

          td.el-table__cell
            color:#526779

          tr:hover > td.el-table__cell
            background:#f5faf9

        .el-form:not(.demo-table-expand)
          .el-form-item
            margin-bottom:20px

          .el-form-item__label
            color:#40566a
            font-weight:500

          .el-input__inner,
          .el-textarea__inner
            border-color:#d8e2e9
            border-radius:8px
            transition:border-color 0.2s ease, box-shadow 0.2s ease

            &:focus
              border-color:#26988e
              box-shadow:0 0 0 2px rgba(38, 152, 142, 0.12)

          .el-button
            border-radius:7px
            font-weight:500

        .form-page-title
          margin:0 0 22px
          color:#263b4d
          font-size:22px
          font-weight:600
          line-height:1.35

        .nurse_form,
        .addDoctor,
        .addPatient,
        .hospitalized,
        .register,
        .takecash,
        .absenceRequest,
        .departure,
        .addPersonalDate,
        .drugApplyC,
        .drugApplyW,
        .patientFeedback,
        .putInStorage,
        .addTrashy
          box-sizing:border-box
          max-width:1120px
          margin:0 auto
          padding:28px
          border:1px solid #e4ebef
          border-radius:12px
          background:#fff
          box-shadow:0 4px 18px rgba(38, 59, 77, 0.04)

          > .el-form
            width:100%

            .el-input,
            .el-select,
            .el-date-editor
              width:100%

        .nurse_form
          max-width:960px

        .register
          max-width:900px

      .HISshow
        opacity:1
        transition:all 0.5s
      .HISshow-enter,.HISshow-leave-active
        opacity:0
        transition:all 0.5s
  .app-body.is-expanded .content
    padding-left:288px

@media (max-width: 768px)
  .innnerApp
    .app-body
      .menu
        width:260px

        &.smallNav
          width:60px

      .content
        padding-left:60px

        .tagcontent
          padding:16px
          .nurse_form,
          .addDoctor,
          .addPatient,
          .hospitalized,
          .register,
          .takecash,
          .absenceRequest,
          .departure,
          .addPersonalDate,
          .drugApplyC,
          .drugApplyW,
          .patientFeedback,
          .putInStorage,
          .addTrashy
            padding:20px

    .app-body.is-expanded .content
      padding-left:260px
</style>
