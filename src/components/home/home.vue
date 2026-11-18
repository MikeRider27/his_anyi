<template>
  <main class="home">
    <section class="welcome-card" aria-labelledby="welcome-title">
      <div class="welcome-icon" aria-hidden="true">
        <i class="el-icon-office-building"></i>
      </div>
      <div class="welcome-copy">
        <p class="eyebrow">Hospital Anyi · Sistema de gestión</p>
        <h1 id="welcome-title">Bienvenido/a, {{ easeHis || 'personal del hospital' }}</h1>
        <p>Accede desde el menú lateral a las funciones disponibles para tu perfil.</p>
      </div>
    </section>

    <section class="getting-started" aria-labelledby="getting-started-title">
      <h2 id="getting-started-title">Cómo empezar</h2>
      <div class="guide-grid">
        <article class="guide-card">
          <div class="guide-icon" aria-hidden="true"><i class="el-icon-menu"></i></div>
          <div>
            <h3>Elige un módulo</h3>
            <p>Utiliza el menú de navegación para abrir el área que necesitas.</p>
          </div>
        </article>
        <article class="guide-card">
          <div class="guide-icon" aria-hidden="true"><i class="el-icon-search"></i></div>
          <div>
            <h3>Consulta la información</h3>
            <p>Busca los registros desde las opciones disponibles en cada módulo.</p>
          </div>
        </article>
        <article class="guide-card">
          <div class="guide-icon" aria-hidden="true"><i class="el-icon-check"></i></div>
          <div>
            <h3>Revisa antes de guardar</h3>
            <p>Confirma que los datos sean correctos antes de completar una acción.</p>
          </div>
        </article>
      </div>
    </section>

    <div class="home-note" role="note">
      <i class="el-icon-info" aria-hidden="true"></i>
      <p>La información y las opciones disponibles dependen del perfil con el que has iniciado sesión.</p>
    </div>
  </main>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex';

  export default {
    name: 'home',
    computed: mapGetters(['easeHis'])
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .home
    box-sizing: border-box
    max-width: 1120px
    margin: 0 auto
    padding: 32px
    color: #263b4d

    .welcome-card
      display: flex
      align-items: center
      padding: 32px
      border: 1px solid #e1ecea
      border-radius: 14px
      background: linear-gradient(120deg, #f0f8f6 0%, #f7fafc 100%)

    .welcome-icon
      display: flex
      flex: 0 0 64px
      align-items: center
      justify-content: center
      width: 64px
      height: 64px
      margin-right: 24px
      border-radius: 18px
      background: #dcefeb
      color: #167d77
      font-size: 30px

    .eyebrow
      margin: 0 0 8px
      color: #167d77
      font-size: 13px
      font-weight: 600
      letter-spacing: 0.3px

    h1
      margin: 0
      color: #203448
      font-size: 28px
      line-height: 1.35

    .welcome-copy > p:last-child
      margin: 10px 0 0
      color: #607285
      font-size: 15px
      line-height: 1.6

    .getting-started
      margin-top: 32px

    h2
      margin: 0 0 16px
      color: #263b4d
      font-size: 19px
      font-weight: 600

    .guide-grid
      display: grid
      grid-template-columns: repeat(3, minmax(0, 1fr))
      gap: 16px

    .guide-card
      display: flex
      min-height: 112px
      padding: 20px
      border: 1px solid #e7ebf0
      border-radius: 12px
      background: #fff

    .guide-icon
      display: flex
      flex: 0 0 40px
      align-items: center
      justify-content: center
      width: 40px
      height: 40px
      margin-right: 14px
      border-radius: 10px
      background: #f0f5f8
      color: #39738a
      font-size: 19px

    .guide-card h3
      margin: 1px 0 7px
      color: #34495e
      font-size: 15px
      font-weight: 600

    .guide-card p
      margin: 0
      color: #68798a
      font-size: 13px
      line-height: 1.55

    .home-note
      display: flex
      align-items: flex-start
      margin-top: 20px
      padding: 14px 16px
      border-radius: 8px
      background: #f3f7fa
      color: #52697c
      font-size: 13px
      line-height: 1.5

      i
        margin: 2px 10px 0 0
        color: #39738a

      p
        margin: 0

  @media (max-width: 860px)
    .home
      padding: 24px

      .guide-grid
        grid-template-columns: 1fr

      .guide-card
        min-height: auto

  @media (max-width: 520px)
    .home
      padding: 16px

      .welcome-card
        align-items: flex-start
        padding: 22px

      .welcome-icon
        flex-basis: 48px
        width: 48px
        height: 48px
        margin-right: 14px
        border-radius: 14px
        font-size: 23px

      h1
        font-size: 22px

      .welcome-copy > p:last-child
        font-size: 14px

      .guide-card
        padding: 16px
</style>
