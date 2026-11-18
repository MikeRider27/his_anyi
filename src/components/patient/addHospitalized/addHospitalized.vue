<template>
  <div class="hospitalized">
    <h1 class="form-page-title">Crear expediente de hospitalización</h1>
    <el-form :model="ruleForm" class="demo-ruleForm hospitalization-form" ref="ruleForm" label-position="top">
      <section class="hospitalization-section">
        <h2>Datos del paciente</h2>
        <div class="hospitalization-grid">
        <el-form-item label="Nombre" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="Contacto" prop="phone">
          <el-input v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="Edad" prop="age">
          <el-input v-model="ruleForm.age"></el-input>
        </el-form-item>
        <el-form-item label="Número de DNI" prop="idCard">
          <el-input v-model="ruleForm.idCard"></el-input>
        </el-form-item>
        <el-form-item label="Sexo" prop="sex">
          <el-radio-group v-model="ruleForm.sex">
            <el-radio :label="1">Hombre</el-radio>
            <el-radio :label="2">Mujer</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Dirección" prop="address">
          <el-input type="textarea" v-model="ruleForm.address" :rows="2"></el-input>
        </el-form-item>
        </div>
      </section>
      <section class="hospitalization-section">
        <h2>Equipo médico y estado</h2>
        <div class="hospitalization-grid">
        <el-form-item label="Médico responsable" prop="doctor">
          <el-select v-model="ruleForm.doctor" placeholder="Seleccione el médico responsable">
            <el-option v-for="item in ruleForm.doctors" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Enfermero(a) a cargo" prop="nurse">
          <el-select v-model="ruleForm.nurse" placeholder="Seleccione el enfermero(a) a cargo">
            <el-option v-for="nurse in ruleForm.nurses" :key="nurse.value" :label="nurse.label" :value="nurse.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Estado del paciente" prop="illness" class="hospitalization-wide">
          <el-input type="textarea" v-model="ruleForm.illness" :rows="3"></el-input>
        </el-form-item>
        <el-form-item label="Tratamiento" prop="treatment" class="hospitalization-wide">
          <el-input type="textarea" v-model="ruleForm.treatment" :rows="3"></el-input>
        </el-form-item>
        <el-form-item label="Medicación" prop="medication" class="hospitalization-wide">
          <el-input type="textarea" v-model="ruleForm.medication" :rows="3"></el-input>
        </el-form-item>
        <el-form-item label="Observaciones" prop="attention" class="hospitalization-wide">
          <el-input type="textarea" v-model="ruleForm.attention" :rows="3"></el-input>
        </el-form-item>
        </div>
      </section>
      <section class="hospitalization-section">
        <h2>Ingreso y ubicación</h2>
        <div class="hospitalization-grid">
        <el-form-item label="Fecha de ingreso" prop="inTime">
          <el-date-picker v-model="ruleForm.inTime" type="date" placeholder="Seleccione la fecha de ingreso" :picker-options="pickerOptions"></el-date-picker>
        </el-form-item>
        <el-form-item label="Fecha de alta" prop="outTime">
          <el-date-picker v-model="ruleForm.outTime" type="date" placeholder="Seleccione la fecha de alta" :picker-options="pickerOptions"></el-date-picker>
        </el-form-item>
        <el-form-item label="Ubicación de hospitalización" prop="room">
          <el-select v-model="ruleForm.room" placeholder="Habitación">
            <el-option label="Edificio 1 de hospitalización210" value="1"></el-option>
            <el-option label="Edificio 1 de hospitalización211" value="2"></el-option>
            <el-option label="Edificio 1 de hospitalización212" value="3"></el-option>
            <el-option label="Edificio 1 de hospitalización213" value="4"></el-option>
            <el-option label="Edificio 1 de hospitalización214" value="5"></el-option>
            <el-option label="Edificio 1 de hospitalización215" value="6"></el-option>
            <el-option label="Edificio 1 de hospitalización216" value="7"></el-option>
            <el-option label="Edificio 1 de hospitalización217" value="8"></el-option>
            <el-option label="Edificio 1 de hospitalización218" value="9"></el-option>
            <el-option label="Edificio 1 de hospitalización219" value="10"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Coste de hospitalización" prop="cost">
          <el-input v-model="ruleForm.cost"></el-input>
        </el-form-item>
        </div>
      </section>
      <div class="hospitalization-actions">
        <el-form-item>
          <el-button @click="onSubmit" type="primary">Crear ahora</el-button>
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
        name: '',
        age: '',
        idCard: '',
        sex: 2,
        address: '',
        doctor: '',
        doctors: [
          {
            value: 'wangxiaogang',
            label: 'Wang Xiaogang'
          },
          {
            value: 'xiejunru',
            label: 'Xie Junru'
          },
          {
            value: 'liaojuntao',
            label: 'Liao Juntao'
          },
          {
            value: 'maobuyi',
            label: 'Mao Buyi'
          },
          {
            value: 'luobocaiwang',
            label: 'Luobo Caiwang'
          },
          {
            value: 'zengming',
            label: 'Zeng Ming'
          },
          {
            value: 'chenwang',
            label: 'Chen Wang'
          },
          {
            value: 'laodong',
            label: 'Lao Dong'
          }],
        nurse: '',
        nurses: [
          {
            value: 'wangxiaoli',
            label: 'Wang Xiaoli'
          },
          {
            value: 'xieduoduo',
            label: 'Xie Duoduo'
          },
          {
            value: 'liaoxiaodan',
            label: 'Liao Xiaodan'
          },
          {
            value: 'lixiaohuai',
            label: 'Li Xiaohua'
          },
          {
            value: 'lilihua',
            label: 'Li Lihua'
          },
          {
            value: 'zenxuefan',
            label: 'Zeng Xuefan'
          },
          {
            value: 'chenshaowen',
            label: 'Chen Shaowen'
          },
          {
            value: 'caiyuling',
            label: 'Cai Yuling'
          }
        ],
        illness: '',
        treatment: '',
        medication: '',
        attention: '',
        room: '',
        inTime: '',
        outTime: '',
        cost: ''
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
    },
    offReset () {
      this.ruleForm = {
        name: '',
        age: '',
        idCard: '',
        sex: 2,
        address: '',
        doctor: '',
        doctors: [
          {
            value: 'wangxiaogang',
            label: 'Wang Xiaogang'
          },
          {
            value: 'xiejunru',
            label: 'Xie Junru'
          },
          {
            value: 'liaojuntao',
            label: 'Liao Juntao'
          },
          {
            value: 'maobuyi',
            label: 'Mao Buyi'
          },
          {
            value: 'luobocaiwang',
            label: 'Luobo Caiwang'
          },
          {
            value: 'zengming',
            label: 'Zeng Ming'
          },
          {
            value: 'chenwang',
            label: 'Chen Wang'
          },
          {
            value: 'laodong',
            label: 'Lao Dong'
          }],
        nurse: '',
        nurses: [
          {
            value: 'wangxiaoli',
            label: 'Wang Xiaoli'
          },
          {
            value: 'xieduoduo',
            label: 'Xie Duoduo'
          },
          {
            value: 'liaoxiaodan',
            label: 'Liao Xiaodan'
          },
          {
            value: 'lixiaohuai',
            label: 'Li Xiaohua'
          },
          {
            value: 'lilihua',
            label: 'Li Lihua'
          },
          {
            value: 'zenxuefan',
            label: 'Zeng Xuefan'
          },
          {
            value: 'chenshaowen',
            label: 'Chen Shaowen'
          },
          {
            value: 'caiyuling',
            label: 'Cai Yuling'
          }
        ],
        illness: '',
        treatment: '',
        medication: '',
        attention: '',
        room: '',
        inTime: '',
        outTime: '',
        cost: ''
      };
    }
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .hospitalized
    max-width:100%

    .hospitalization-section
      margin-bottom:24px

      h2
        margin:0 0 16px
        color:#34495e
        font-size:17px
        font-weight:600

    .hospitalization-grid
      display:grid
      grid-template-columns:repeat(2, minmax(0, 1fr))
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
      .el-select,
      .el-date-editor
        width:100%

      .el-radio-group
        display:flex
        align-items:center
        min-height:40px
        gap:18px

      .hospitalization-wide
        grid-column:1 / -1

      .el-textarea__inner
        min-height:80px

    .hospitalization-actions
      display:flex
      justify-content:center
      padding-top:8px

      .el-form-item
        margin:0 !important

      .el-form-item__content
        display:flex
        flex-wrap:wrap
        justify-content:center
        gap:8px
        margin-left:0 !important

  @media (max-width: 600px)
    .hospitalized .hospitalization-grid
      grid-template-columns:minmax(0, 1fr)

      .hospitalization-wide
        grid-column:auto
</style>
