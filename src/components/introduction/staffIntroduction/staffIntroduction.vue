<template>
  <div class="staffIntroduction">
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
      <el-tab-pane label="Médicos" name="first">
        <span class="title"><em>Consultas externas</em></span>
        <div class="input">
          <el-input size="mini" type="text" placeholder="Buscar departamento" v-model="input" style="width:150px"></el-input>
          <el-input size="mini" type="text" placeholder="Buscar médico" v-model="input" style="width:150px"></el-input>
          <el-input size="mini" type="text" placeholder="Buscar enfermedad" v-model="input" style="width:150px"></el-input>
          <el-button size="mini" type="primary" @click="Onsubmit">Consultar</el-button>
        </div>
        <div class="table">
           <el-table ref="multipleTable" :data="table" border stripe tooltip-effect="dark" class="staff-table">
              <el-table-column type="expand" width="52" class-name="staff-expand-control">
                <template slot-scope="props">
                  <div class="staff-row-details">
                    <div><strong>Sexo:</strong><span>{{ props.row.sex }}</span></div>
                    <div><strong>Edad:</strong><span>{{ props.row.age }}</span></div>
                    <div><strong>Cargo:</strong><span>{{ props.row.position }}</span></div>
                    <div><strong>Departamento:</strong><span>{{ props.row.department }}</span></div>
                    <div><strong>Ubicación:</strong><span>{{ props.row.area }}</span></div>
                    <div><strong>Especialidad:</strong><span>{{ props.row.special }}</span></div>
                    <div class="staff-row-message"><strong>Detalles:</strong><span>{{ props.row.message }}</span></div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="N.º" width="70">
                <template slot-scope="scope">{{ scope.$index }}</template>
              </el-table-column>
              <el-table-column prop="name" label="Nombre del médico" min-width="150" show-overflow-tooltip></el-table-column>
              <el-table-column prop="department" label="Departamento" min-width="150" show-overflow-tooltip></el-table-column>
              <el-table-column prop="area" label="Ubicación" min-width="130" show-overflow-tooltip></el-table-column>
              <el-table-column align="center" label="Cita telefónica" width="160">
                <template slot-scope="scope">
                  <el-button size="mini" icon="el-icon-phone" @click="handleOrder(scope.$index)">Cita telefónica</el-button>
                </template>
              </el-table-column>
           </el-table>
        </div>       
      </el-tab-pane>
      <el-tab-pane label="Enfermeros" name="second">
        <span class="title"><em>Consultas externas</em></span>
        <div class="input">
          <el-input size="mini" type="text" placeholder="Buscar departamento" v-model="input" style="width:150px"></el-input>
          <el-input size="mini" type="text" placeholder="Buscar enfermero" v-model="input" style="width:150px"></el-input>
          <el-input size="mini" type="text" placeholder="Buscar habitación" v-model="input" style="width:150px"></el-input>
          <el-button size="mini" type="primary" @click="Onsubmit">Consultar</el-button>
        </div> 
         <div class="table2">
           <el-table ref="multipleTable" :data="table2" border stripe tooltip-effect="dark" class="staff-table">
              <el-table-column type="expand" width="52" class-name="staff-expand-control">
                <template slot-scope="props">
                  <div class="staff-row-details">
                    <div><strong>Sexo:</strong><span>{{ props.row.sex }}</span></div>
                    <div><strong>Edad:</strong><span>{{ props.row.age }}</span></div>
                    <div><strong>Cargo:</strong><span>{{ props.row.position }}</span></div>
                    <div><strong>Departamento:</strong><span>{{ props.row.department }}</span></div>
                    <div><strong>Ubicación:</strong><span>{{ props.row.area }}</span></div>
                    <div><strong>Especialidad:</strong><span>{{ props.row.special }}</span></div>
                    <div class="staff-row-message"><strong>Detalles:</strong><span>{{ props.row.message }}</span></div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="N.º" width="70">
                <template slot-scope="scope">{{ scope.$index }}</template>
              </el-table-column>
              <el-table-column prop="name" label="Nombre del enfermero" min-width="150" show-overflow-tooltip></el-table-column>
              <el-table-column prop="department" label="Departamento" min-width="150" show-overflow-tooltip></el-table-column>
              <el-table-column prop="area" label="Ubicación" min-width="130" show-overflow-tooltip></el-table-column>
              <el-table-column align="center" label="Cita telefónica" width="160">
                <template slot-scope="scope">
                  <el-button size="mini" icon="el-icon-phone" @click="handleOrder(scope.$index)">Cita telefónica</el-button>
                </template>
              </el-table-column>
           </el-table>
        </div>       
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script type="text/ecmascript-6">
  import {api} from '../../../global/api.js';
  export default {
    data () {
      return {
        activeName2: 'first',
        input: '',
        table: [],
        table2: []
      };
    },
    methods: {
      handleClick (tab, event) {
      },
      Onsubmit () {
        this.$message({
          message: 'Consultando...',
          type: 'success'
        });
      },
      handleOrder () {
        this.$message({
          message: 'Reservando...',
          type: 'success'
        });
      }
    },
    created () {
      this.$http.get(api.staffIntroduction).then((response) => {             // mark
        this.table = response.body.table;
        this.table2 = response.body.table2;
        this.message = response.body.message;
      }, response => {
        // error callback
        this.$message({
          message: 'Error al solicitar los datos',
          type: 'error'
        });
      });
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .staffIntroduction
    .title
      display:block
      margin:0 0 14px
      color:#263b4d
      font-size:20px
      font-weight:600

    .input
      display:flex
      flex-wrap:wrap
      align-items:center
      gap:8px
      margin-bottom:18px

      .el-input
        flex:1 1 150px
        max-width:220px

    .table,
    .table2
      margin-top:18px

    .staff-table
      width:100%

    .staff-expand-control
      .el-table__expand-icon
        width:24px
        height:24px
        border:1px solid #d5e0e7
        border-radius:50%
        color:#167d77
        transform:none

        .el-icon-arrow-right
          display:none

        &::before
          content:"+"
          font-size:18px
          font-weight:600
          line-height:20px

      .el-table__expand-icon--expanded::before
        content:"−"

    .staff-row-details
      display:grid
      grid-template-columns:repeat(3, minmax(0, 1fr))
      gap:12px 20px
      padding:8px 20px

      > div
        display:flex
        flex-direction:column
        min-width:0
        gap:4px

      strong
        color:#40566a
        font-size:12px

      span
        overflow-wrap:anywhere
        color:#526779

      .staff-row-message
        grid-column:1 / -1

  @media (max-width: 700px)
    .staffIntroduction .staff-row-details
      grid-template-columns:repeat(2, minmax(0, 1fr))
</style>