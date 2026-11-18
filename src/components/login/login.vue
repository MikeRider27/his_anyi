<template>
  <div class="login">
    <main class="login-container">
      <div class="brand-mark" aria-hidden="true">
        <i class="el-icon-office-building"></i>
      </div>
      <p class="eyebrow">Hospital Anyi</p>
      <h1 class="title">Sistema de gestión hospitalaria</h1>
      <p class="subtitle">Introduce tus datos de acceso para continuar.</p>

      <el-form
        ref="form"
        :model="form"
        label-position="top"
        @submit.native.prevent="_login">
        <el-form-item label="Usuario" prop="name">
          <el-input
            id="username"
            v-model.trim="form.name"
            autocomplete="username"
            placeholder="Introduce tu usuario"
            @keyup.enter.native="nextInput">
          </el-input>
        </el-form-item>
        <el-form-item label="Contraseña" prop="password">
          <el-input
            ref="passwordInput"
            v-model="form.password"
            type="password"
            autocomplete="current-password"
            placeholder="Introduce tu contraseña"
            @keyup.enter.native="_login">
          </el-input>
        </el-form-item>
        <el-button type="primary" native-type="submit" :loading="isLoading" :disabled="isLoading">
          Iniciar sesión
        </el-button>
      </el-form>
    </main>
    <footer class="login-footer">© Todos los derechos reservados · MikeRider27 · Versión 1.0</footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapActions} from 'vuex';
  import {api} from '../../global/api.js';

  export default {
    name: 'login',
    data () {
      return {
        form: {
          name: '',
          password: ''
        },
        isLoading: false
      };
    },
    methods: {
      ...mapActions({setUserInfo: 'setUserInfo'}),
      _login () {
        if (this.isLoading) return;
        if (!this.form.name || !this.form.password) {
          this.$message.warning(!this.form.name ? 'Introduce tu usuario.' : 'Introduce tu contraseña.');
          return;
        }

        this.isLoading = true;
        this.$http.get(api.login).then((response) => {
          const users = response.body && response.body.user;
          if (!Array.isArray(users)) {
            this.isLoading = false;
            this.$message.error('No se pudo validar el acceso. Inténtalo de nuevo más tarde.');
            return;
          }

          const user = users.find((item) => item.name === this.form.name && item.password === this.form.password);
          if (!user) {
            this.isLoading = false;
            this.$message.warning('Usuario o contraseña incorrectos.');
            return;
          }

          this.setUserInfo({name: user.name, type: user.type});
          this.isLoading = false;
          this.$router.push({path: '/home'});
        }, () => {
          this.isLoading = false;
          this.$message.error('No se pudo conectar con el servicio de acceso. Inténtalo de nuevo más tarde.');
        });
      },
      nextInput () {
        this.$refs.passwordInput.focus();
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .login
    box-sizing: border-box
    display: flex
    flex-direction: column
    align-items: center
    position: fixed
    top: 0
    right: 0
    bottom: 0
    left: 0
    overflow-y: auto
    padding: 24px
    background: linear-gradient(145deg, #263b4b 0%, #314b5d 55%, #203544 100%)

    .login-container
      box-sizing: border-box
      width: 100%
      max-width: 440px
      margin: auto 0 12px
      padding: 40px
      border: 1px solid #e4e9ef
      border-radius: 16px
      background: #fff
      box-shadow: 0 16px 40px rgba(32, 54, 72, 0.1)

    .login-footer
      flex: 0 0 auto
      padding: 8px 0
      color: rgba(255, 255, 255, 0.78)
      font-size: 12px
      line-height: 1.4
      text-align: center

    .brand-mark
      display: flex
      align-items: center
      justify-content: center
      width: 56px
      height: 56px
      margin: 0 auto 18px
      border-radius: 16px
      background: #e8f4f2
      color: #167d77
      font-size: 28px

    .eyebrow
      margin: 0 0 8px
      color: #167d77
      font-size: 14px
      font-weight: 600
      text-align: center

    .title
      margin: 0
      color: #203448
      font-size: 26px
      font-weight: 700
      line-height: 1.35
      text-align: center

    .subtitle
      margin: 10px 0 28px
      color: #657587
      font-size: 14px
      line-height: 1.5
      text-align: center

    .el-form-item
      margin-bottom: 20px

    .el-form-item__label
      padding-bottom: 6px
      color: #34495e
      font-weight: 600

    .el-input__inner
      height: 44px
      border-radius: 8px

    .el-button
      width: 100%
      height: 44px
      margin-top: 4px
      border-radius: 8px
      background-color: #167d77
      border-color: #167d77
      font-size: 15px

    .el-button:hover,
    .el-button:focus
      background-color: #116b66
      border-color: #116b66

  @media (max-width: 480px)
    .login
      padding: 16px

      .login-container
        padding: 30px 24px

      .title
        font-size: 23px
</style>
