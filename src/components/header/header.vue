<template>
  <header class="header">
    <el-dropdown trigger="click" @command="handleCommand" popper-class="user-dropdown-menu">
      <el-button class="user-menu" aria-label="Abrir menú de usuario">
        <span class="user-name">{{ easeHis }}</span>
        <span class="user-avatar" aria-hidden="true">{{ userInitial }}</span>
        <i class="el-icon-arrow-down" aria-hidden="true"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>
          <router-link class="dropdown-link" to="/home" style="color:#40566a;text-decoration:none;">Inicio</router-link>
        </el-dropdown-item>
        <el-dropdown-item>
          <router-link class="dropdown-link" to="/addPersonalDate" style="color:#40566a;text-decoration:none;">Mi información</router-link>
        </el-dropdown-item>
        <el-dropdown-item>
          <router-link class="dropdown-link" to="/absenceRequest" style="color:#40566a;text-decoration:none;">Solicitar permiso</router-link>
        </el-dropdown-item>
        <el-dropdown-item>
          <router-link class="dropdown-link" to="/departure" style="color:#40566a;text-decoration:none;">Solicitar baja</router-link>
        </el-dropdown-item>
        <el-dropdown-item>
          <router-link class="dropdown-link" to="/hasComplaints" style="color:#40566a;text-decoration:none;">Ver quejas</router-link>
        </el-dropdown-item>
        <el-dropdown-item divided command="logout">Cerrar sesión</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </header>
</template>

<script type="text/ecmascript-6">
  import {mapGetters, mapActions} from 'vuex';

  export default {
    name: 'app-header',
    computed: {
      ...mapGetters(['easeHis']),
      userInitial () {
        return String(this.easeHis || 'U').charAt(0).toUpperCase();
      }
    },
    methods: {
      ...mapActions(['setSignOut']),
      handleCommand (command) {
        if (command === 'logout') {
          this.setSignOut();
          this.$router.replace({path: '/login'});
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .header
    box-sizing: border-box
    display: flex
    align-items: center
    justify-content: flex-end
    min-height: 56px
    padding: 0 24px
    background: #fff
    border-bottom: 1px solid #e8edf1

    .user-menu
      display: flex
      align-items: center
      padding: 5px 8px
      border: 0
      background: transparent
      color: #34495e

      &:hover,
      &:focus
        background: #f3f7f8

      .user-name
        max-width: 180px
        overflow: hidden
        margin-right: 10px
        text-overflow: ellipsis
        white-space: nowrap

      .user-avatar
        display: inline-flex
        align-items: center
        justify-content: center
        width: 34px
        height: 34px
        margin-right: 8px
        border-radius: 50%
        background: #e2f0ed
        color: #167d77
        font-size: 15px
        font-weight: 600

@media (max-width: 520px)
  .header
    min-height: 52px
    padding: 0 12px

    .user-menu .user-name
      max-width: 120px

.user-dropdown-menu
  padding:6px
  border:1px solid #e4ebef
  border-radius:10px
  box-shadow:0 8px 24px rgba(38, 59, 77, 0.14)

  .el-dropdown-menu__item
    min-width:150px
    padding:0
    border-radius:6px
    color:#40566a
    line-height:40px

    &:hover,
    &:focus
      background:#f1f7f6
      color:#167d77

    &.is-divided
      margin-top:6px
      border-top-color:#e8eef2

  .user-dropdown-menu .el-dropdown-menu__item a.dropdown-link
    display:block
    padding:0 14px
    color:#40566a !important
    text-decoration:none !important

    &:hover,
    &:focus,
    &:visited
      color:#167d77 !important
      text-decoration:none !important
</style>
