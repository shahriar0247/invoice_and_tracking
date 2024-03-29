"""changed issued to to issued to id in shipment

Revision ID: a302bf470113
Revises: 65c570c8e370
Create Date: 2024-01-21 17:23:01.449452

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a302bf470113'
down_revision = '65c570c8e370'
branch_labels = None
depends_on = None


def upgrade():
   
    with op.batch_alter_table('shipment', schema=None) as batch_op:
        batch_op.add_column(sa.Column('shipment_status', sa.String(length=1200), nullable=True))
        batch_op.drop_column('invoice_status')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('shipment', schema=None) as batch_op:
        batch_op.add_column(sa.Column('invoice_status', sa.VARCHAR(length=1200), autoincrement=False, nullable=True))
        batch_op.alter_column('id',
               existing_type=sa.VARCHAR(length=20),
               nullable=False)
        batch_op.drop_column('shipment_status')

    with op.batch_alter_table('purchase__order', schema=None) as batch_op:
        batch_op.alter_column('invoice_id',
               existing_type=sa.Integer(),
               type_=sa.VARCHAR(length=20),
               existing_nullable=True)
        batch_op.alter_column('id',
               existing_type=sa.VARCHAR(length=20),
               nullable=False)

    with op.batch_alter_table('item_history', schema=None) as batch_op:
        batch_op.alter_column('id',
               existing_type=sa.VARCHAR(length=20),
               nullable=False)

    with op.batch_alter_table('item', schema=None) as batch_op:
        batch_op.alter_column('vendor_cost',
               existing_type=sa.Float(precision=5),
               type_=sa.REAL(),
               existing_nullable=True)
        batch_op.alter_column('price',
               existing_type=sa.Float(precision=5),
               type_=sa.REAL(),
               existing_nullable=True)

    with op.batch_alter_table('invoice', schema=None) as batch_op:
        batch_op.alter_column('id',
               existing_type=sa.VARCHAR(length=20),
               nullable=False)

    with op.batch_alter_table('daily__account', schema=None) as batch_op:
        batch_op.alter_column('id',
               existing_type=sa.VARCHAR(length=20),
               nullable=False)

    # ### end Alembic commands ###
